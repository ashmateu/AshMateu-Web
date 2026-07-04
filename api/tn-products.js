export const config = { runtime: 'edge' };

// Proxy de catálogo Tiendanube.
// El token NUNCA llega al browser: vive en env vars de Vercel.
// Respuesta cacheada 5 min en el edge para respetar el rate limit (~2 req/s).

const CACHE_SECONDS = 300;

function stripHtml(s) {
  return String(s ?? '').replace(/<[^>]*>/g, '').trim();
}

export default async function handler() {
  const storeId = process.env.TN_STORE_ID;
  const token   = process.env.TN_ACCESS_TOKEN;

  if (!storeId || !token) {
    return new Response(JSON.stringify({ error: 'tiendanube_not_configured' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const res = await fetch(
    `https://api.tiendanube.com/v1/${storeId}/products?published=true&per_page=50&fields=id,name,description,variants,images,canonical_url,categories,published`,
    {
      headers: {
        // Quirk de Tiendanube: el header es "Authentication", no "Authorization"
        'Authentication': `bearer ${token}`,
        'User-Agent': 'ashmateu-web (ash.mateu@gmail.com)',
        'Content-Type': 'application/json',
      },
    },
  );

  if (!res.ok) {
    return new Response(JSON.stringify({ error: 'tiendanube_error', status: res.status }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const products = await res.json();

  // Normalizar a la forma que ya usa mercadito.html
  const items = products.map(p => {
    const v = p.variants?.[0] ?? {};
    const isDigital = (p.categories ?? []).some(c =>
      (c.name?.es ?? '').toLowerCase().includes('digital'));
    return {
      id: `tn-${p.id}`,
      name: p.name?.es ?? '',
      description: stripHtml(p.description?.es).slice(0, 200),
      price: Number(v.price ?? 0),
      currency: process.env.TN_CURRENCY ?? 'ARS',
      image_url: p.images?.[0]?.src ?? null,
      category: isDigital ? 'digital' : 'pieza',
      stock: v.stock === null ? 99 : Number(v.stock ?? 0),
      active: p.published === true,
      buy_url: p.canonical_url, // checkout en Tiendanube
    };
  });

  return new Response(JSON.stringify(items), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=60`,
    },
  });
}
