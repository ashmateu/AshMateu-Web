export const config = { runtime: 'edge' };

const AUTHOR_URL = 'https://marieclaire.perfil.com/autores/ashmateu';

function extractMeta(html, property) {
  const m = html.match(new RegExp(`<meta[^>]+property="${property}"[^>]+content="([^"]+)"`, 'i'))
    || html.match(new RegExp(`<meta[^>]+content="([^"]+)"[^>]+property="${property}"`, 'i'));
  return m?.[1] ?? null;
}

function extractExcerpt(html) {
  // Primer párrafo con al menos 80 caracteres
  const m = html.match(/<p[^>]*>((?:(?!<p|<\/p>).){80,}?)<\/p>/s);
  if (!m) return null;
  return m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().slice(0, 320);
}

export default async function handler(req) {
  // Vercel Cron envía Authorization: Bearer <CRON_SECRET>
  const auth = req.headers.get('authorization') ?? '';
  const secret = process.env.CRON_SECRET;
  if (secret && auth !== `Bearer ${secret}`) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return new Response(JSON.stringify({ error: 'Missing env vars' }), { status: 500 });
  }

  const sbHeaders = {
    'apikey': SUPABASE_SERVICE_KEY,
    'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
    'Content-Type': 'application/json',
  };

  // 1. Scrapeamos la página de Ash en Marie Claire
  const pageRes = await fetch(AUTHOR_URL, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ashmateu-bot/1.0)' }
  });
  if (!pageRes.ok) {
    return new Response(JSON.stringify({ error: 'Cannot fetch author page', status: pageRes.status }), { status: 502 });
  }
  const pageHtml = await pageRes.text();

  // 2. Extraemos todas las URLs de artículos
  const articleUrls = [...new Set(
    [...pageHtml.matchAll(/href="(https:\/\/marieclaire\.perfil\.com\/noticias\/[^"]+\.phtml)"/g)]
      .map(m => m[1])
  )];

  if (!articleUrls.length) {
    return new Response(JSON.stringify({ error: 'No articles found on author page' }), { status: 502 });
  }

  // 3. URLs ya existentes en Supabase
  const existingRes = await fetch(`${SUPABASE_URL}/rest/v1/press?select=url`, { headers: sbHeaders });
  const existing = await existingRes.json();
  const existingUrls = new Set((existing ?? []).map(r => r.url));

  // 4. Procesar solo artículos nuevos
  const newUrls = articleUrls.filter(url => !existingUrls.has(url));
  const inserted = [];
  const errors = [];

  for (const url of newUrls) {
    try {
      const artRes = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ashmateu-bot/1.0)' }
      });
      if (!artRes.ok) { errors.push({ url, reason: artRes.status }); continue; }
      const artHtml = await artRes.text();

      let title = extractMeta(artHtml, 'og:title') ?? url;
      // Limpiar sufijo " - Marie Claire Argentina" etc.
      title = title.replace(/\s*[-|–]\s*Marie Claire.*/i, '').trim();

      const cover_url = extractMeta(artHtml, 'og:image');
      const isoDate = extractMeta(artHtml, 'article:published_time');
      const publication_date = isoDate ? isoDate.slice(0, 10) : new Date().toISOString().slice(0, 10);
      const excerpt = extractExcerpt(artHtml);

      const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/press`, {
        method: 'POST',
        headers: { ...sbHeaders, 'Prefer': 'return=minimal' },
        body: JSON.stringify({
          title,
          publication: 'Marie Claire Argentina',
          publication_date,
          url,
          cover_url,
          excerpt,
          featured: false,
          active: true,
        })
      });

      if (insertRes.ok) {
        inserted.push(title);
      } else {
        const err = await insertRes.text();
        errors.push({ url, reason: err });
      }
    } catch (e) {
      errors.push({ url, reason: String(e) });
    }
  }

  return new Response(JSON.stringify({
    checked: articleUrls.length,
    already_in_db: existingUrls.size,
    new_found: newUrls.length,
    inserted: inserted.length,
    articles: inserted,
    errors,
  }, null, 2), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
