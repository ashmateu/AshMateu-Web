export const config = { runtime: 'edge' };

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
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
  const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;

  // 1. Obtener detalle del pago desde MercadoPago
  const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` }
  });

  if (!mpRes.ok) {
    return new Response(JSON.stringify({ error: 'MP fetch failed' }), { status: 502 });
  }

  const payment = await mpRes.json();

  const orderData = {
    mp_payment_id: String(paymentId),
    status: payment.status,
    amount: payment.transaction_amount,
    currency: payment.currency_id,
    buyer_email: payment.payer?.email ?? null,
    buyer_name: [payment.payer?.first_name, payment.payer?.last_name].filter(Boolean).join(' ') || null,
    external_ref: payment.external_reference ?? null,
    mp_raw: payment,
    updated_at: new Date().toISOString()
  };

  // 2. Upsert orden en Supabase
  const sbRes = await fetch(`${SUPABASE_URL}/rest/v1/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
      'Prefer': 'resolution=merge-duplicates,return=minimal'
    },
    body: JSON.stringify(orderData)
  });

  if (!sbRes.ok) {
    const err = await sbRes.text();
    return new Response(JSON.stringify({ error: 'Supabase error', detail: err }), { status: 502 });
  }

  // 3. Si el pago fue aprobado, descontar stock
  if (payment.status === 'approved' && payment.external_reference) {
    await fetch(`${SUPABASE_URL}/rest/v1/rpc/decrement_stock`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`
      },
      body: JSON.stringify({ p_id: payment.external_reference })
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
