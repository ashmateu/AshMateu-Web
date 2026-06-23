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

  const { type, data } = body;

  if (type !== 'payment' || !data?.id) {
    return new Response(JSON.stringify({ ok: true, skipped: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const paymentId = data.id;
  const SUPABASE_URL      = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
  const MP_ACCESS_TOKEN   = process.env.MP_ACCESS_TOKEN;

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
    // Pago sin referencia de orden (ej. prueba manual) — ignorar sin error
    return new Response(JSON.stringify({ ok: true, skipped: true, reason: 'no_external_reference' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const status = STATUS_MAP[payment.status] ?? payment.status;

  // 2. PATCH la orden existente (creada en mercadito.html con user_id)
  //    No insertamos fila nueva para no perder el user_id original.
  const sbHeaders = {
    'Content-Type': 'application/json',
    'apikey': SUPABASE_SERVICE_KEY,
    'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
    'Prefer': 'return=minimal',
  };

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

  // 3. Descontar stock solo cuando el pago fue aprobado
  if (payment.status === 'approved') {
    await fetch(`${SUPABASE_URL}/rest/v1/rpc/decrement_stock`, {
      method: 'POST',
      headers: sbHeaders,
      body: JSON.stringify({ p_order_id: orderId }),
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
