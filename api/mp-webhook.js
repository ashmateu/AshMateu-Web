export const config = { runtime: 'edge' };

// MP status → orders.status
const STATUS_MAP = {
  approved:    'confirmado',
  pending:     'pendiente',
  in_process:  'pendiente',
  rejected:    'rechazado',
  cancelled:   'rechazado',
  refunded:    'rechazado',
};

async function verifyMPSignature(request, body) {
  const secret = process.env.MP_WEBHOOK_SECRET;
  if (!secret) return true; // sin secreto configurado, skip (modo dev)

  const sigHeader = request.headers.get('x-signature') ?? '';
  const requestId = request.headers.get('x-request-id') ?? '';

  const tsMatch  = sigHeader.match(/ts=([^,]+)/);
  const v1Match  = sigHeader.match(/v1=([^,]+)/);
  if (!tsMatch || !v1Match) return false;

  const ts       = tsMatch[1];
  const expected = v1Match[1];

  // Manifest: id:<data.id>;request-id:<x-request-id>;ts:<ts>;
  const dataId = body?.data?.id ?? '';
  const manifest = `id:${dataId};request-id:${requestId};ts:${ts};`;

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sigBuf  = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(manifest));
  const computed = Array.from(new Uint8Array(sigBuf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  return computed === expected;
}

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  const valid = await verifyMPSignature(request, body);
  if (!valid) {
    return new Response('Invalid signature', { status: 401 });
  }

  const { type, data } = body;

  if (type !== 'payment' || !data?.id) {
    return new Response(JSON.stringify({ ok: true, skipped: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const paymentId = data.id;
  const SUPABASE_URL         = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
  const MP_ACCESS_TOKEN      = process.env.MP_ACCESS_TOKEN;

  const sbHeaders = {
    'Content-Type': 'application/json',
    'apikey': SUPABASE_SERVICE_KEY,
    'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
    'Prefer': 'return=minimal',
  };

  // 1. Obtener detalle del pago desde MercadoPago
  const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` }
  });

  if (!mpRes.ok) {
    return new Response(JSON.stringify({ error: 'MP fetch failed' }), { status: 502 });
  }

  const payment = await mpRes.json();
  const orderId = payment.external_reference;

  if (!orderId) {
    return new Response(JSON.stringify({ ok: true, skipped: true, reason: 'no_external_reference' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const status = STATUS_MAP[payment.status] ?? payment.status;

  // 2. Idempotencia: si la orden ya está confirmada, ignorar el reintento
  const checkRes = await fetch(`${SUPABASE_URL}/rest/v1/orders?id=eq.${orderId}&select=status`, {
    headers: { ...sbHeaders, 'Accept': 'application/json' },
  });
  const checkData = await checkRes.json();
  if (checkData?.[0]?.status === 'confirmado') {
    return new Response(JSON.stringify({ ok: true, skipped: true, reason: 'already_confirmed' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 3. PATCH la orden existente (creada en mercadito.html con user_id)
  const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/orders?id=eq.${orderId}`, {
    method: 'PATCH',
    headers: sbHeaders,
    body: JSON.stringify({
      mp_payment_id: String(paymentId),
      status,
      buyer_email:  payment.payer?.email ?? null,
      buyer_name:   [payment.payer?.first_name, payment.payer?.last_name].filter(Boolean).join(' ') || null,
      mp_raw:       payment,
      updated_at:   new Date().toISOString(),
    }),
  });

  if (!patchRes.ok) {
    const err = await patchRes.text();
    return new Response(JSON.stringify({ error: 'Supabase PATCH failed', detail: err }), { status: 502 });
  }

  // 4. Descontar stock solo cuando el pago fue aprobado
  if (payment.status === 'approved') {
    const rpcRes = await fetch(`${SUPABASE_URL}/rest/v1/rpc/decrement_stock`, {
      method: 'POST',
      headers: sbHeaders,
      body: JSON.stringify({ p_order_id: orderId }),
    });
    if (!rpcRes.ok) {
      const rpcErr = await rpcRes.text();
      console.error('decrement_stock failed:', rpcErr);
    }
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
