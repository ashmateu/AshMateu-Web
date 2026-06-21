export const config = { runtime: 'edge' };

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
  if (!ACCESS_TOKEN) {
    return new Response(JSON.stringify({ error: 'MP_ACCESS_TOKEN not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  const { items, buyer, order_id } = body;

  if (!items?.length || !buyer) {
    return new Response(JSON.stringify({ error: 'Missing items or buyer data' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const preference = {
    items: items.map(i => ({
      id: String(i.id),
      title: i.name,
      quantity: Number(i.quantity) || 1,
      unit_price: Number(i.price),
      currency_id: i.currency || 'ARS',
    })),
    payer: {
      name: buyer.name || '',
      email: buyer.email || '',
      phone: { area_code: '', number: String(buyer.phone || '') },
      identification: { type: 'DNI', number: String(buyer.dni || '') },
      address: {
        street_name: buyer.street || '',
        street_number: String(buyer.street_number || ''),
        zip_code: String(buyer.cp || ''),
      },
    },
    back_urls: {
      success: 'https://ashmateu.com/cuenta.html',
      failure: 'https://ashmateu.com/mercadito.html',
      pending: 'https://ashmateu.com/cuenta.html',
    },
    auto_return: 'approved',
    external_reference: String(order_id || ''),
    statement_descriptor: 'ASH MATEU',
  };

  const mpRes = await fetch('https://api.mercadopago.com/checkout/preferences', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(preference),
  });

  const mpData = await mpRes.json();

  if (!mpRes.ok) {
    return new Response(JSON.stringify({ error: mpData }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({
    init_point: mpData.init_point,
    preference_id: mpData.id,
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
