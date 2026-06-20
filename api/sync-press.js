const AUTHOR_URL = 'https://marieclaire.perfil.com/autores/ashmateu';

function extractMeta(html, property) {
  // Soporta property= y name= en cualquier orden con content=
  const patterns = [
    new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${property}["']`, 'i'),
    new RegExp(`<meta[^>]+name=["']${property}["'][^>]+content=["']([^"']+)["']`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${property}["']`, 'i'),
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m?.[1]) return m[1].trim();
  }
  return null;
}

function extractCoverImage(html) {
  // 1. og:image
  const og = extractMeta(html, 'og:image');
  if (og) return og;

  // 2. twitter:image
  const tw = extractMeta(html, 'twitter:image');
  if (tw) return tw;

  // 3. og:image:url
  const ogUrl = extractMeta(html, 'og:image:url');
  if (ogUrl) return ogUrl;

  // 4. Primera imagen de fotos.perfil.com en el body
  const m = html.match(/https:\/\/fotos\.perfil\.com\/[^"' \s>]+(?:\.jpe?g|\.png|\.webp)/i);
  if (m) return m[0];

  return null;
}

function extractExcerpt(html) {
  const m = html.match(/<p[^>]*>((?:(?!<p|<\/p>).){80,}?)<\/p>/s);
  if (!m) return null;
  return m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().slice(0, 320);
}

// Extrae el thumbnail asociado a cada URL desde la página del autor
function buildThumbnailMap(pageHtml, articleUrls) {
  const map = {};
  // Busca bloques que contengan el link del artículo + una imagen cercana
  for (const url of articleUrls) {
    const escaped = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Ventana de 2000 chars alrededor del link
    const re = new RegExp(`.{0,1500}${escaped}.{0,1500}`, 's');
    const block = pageHtml.match(re)?.[0] ?? '';
    const imgMatch = block.match(/https:\/\/fotos\.perfil\.com\/[^"' \s>]+(?:\.jpe?g|\.png|\.webp)/i);
    if (imgMatch) map[url] = imgMatch[0];
  }
  return map;
}

export default async function handler(req, res) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers['authorization'] ?? '';
    if (auth !== `Bearer ${secret}`) return res.status(401).json({ error: 'Unauthorized' });
  }

  const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY
    || process.env.SUPABASE_SECRET_KEY
    || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return res.status(500).json({ error: 'Missing env vars' });
  }

  const sbHeaders = {
    'apikey': SUPABASE_SERVICE_KEY,
    'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
    'Content-Type': 'application/json',
  };

  // 1. Página de autora
  const pageRes = await fetch(AUTHOR_URL, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ashmateu-bot/1.0)' }
  });
  if (!pageRes.ok) return res.status(502).json({ error: 'Cannot fetch author page', status: pageRes.status });
  const pageHtml = await pageRes.text();

  // 2. URLs de artículos
  const articleUrls = [...new Set(
    [...pageHtml.matchAll(/href="(https:\/\/marieclaire\.perfil\.com\/noticias\/[^"]+\.phtml)"/g)]
      .map(m => m[1])
  )];
  if (!articleUrls.length) return res.status(502).json({ error: 'No articles found on author page' });

  // Thumbnails desde la página de listado (primer pasada rápida, sin fetch extra)
  const listingThumbs = buildThumbnailMap(pageHtml, articleUrls);

  // 3. URLs ya en Supabase
  const existingRes = await fetch(`${SUPABASE_URL}/rest/v1/press?select=url,cover_url`, { headers: sbHeaders });
  const existing = await existingRes.json();
  const existingUrls = new Set((existing ?? []).map(r => r.url));

  // 4. Artículos sin imagen en DB (para retroactivo)
  const withoutImage = (existing ?? []).filter(r => r.url && !r.cover_url);

  // 5. Procesar nuevos
  const newUrls = articleUrls.filter(url => !existingUrls.has(url));
  const inserted = [];
  const updated = [];
  const errors = [];

  for (const url of newUrls) {
    try {
      const artRes = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ashmateu-bot/1.0)' }
      });
      if (!artRes.ok) { errors.push({ url, reason: artRes.status }); continue; }
      const artHtml = await artRes.text();

      let title = extractMeta(artHtml, 'og:title') ?? url;
      title = title.replace(/\s*[-|–]\s*Marie Claire.*/i, '').trim();

      // Imagen: artículo primero, luego listing thumbnail como fallback
      const cover_url = extractCoverImage(artHtml) ?? listingThumbs[url] ?? null;

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

      if (insertRes.ok) inserted.push({ title, cover_url });
      else errors.push({ url, reason: await insertRes.text() });
    } catch (e) {
      errors.push({ url, reason: String(e) });
    }
  }

  // 6. Actualizar artículos existentes sin imagen (retroactivo)
  for (const row of withoutImage) {
    try {
      // Primero intentar thumbnail del listing
      let cover_url = listingThumbs[row.url] ?? null;

      // Si no hay en listing, fetchear el artículo
      if (!cover_url) {
        const artRes = await fetch(row.url, {
          headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ashmateu-bot/1.0)' }
        });
        if (artRes.ok) {
          cover_url = extractCoverImage(await artRes.text());
        }
      }

      if (!cover_url) continue;

      const upRes = await fetch(`${SUPABASE_URL}/rest/v1/press?url=eq.${encodeURIComponent(row.url)}`, {
        method: 'PATCH',
        headers: { ...sbHeaders, 'Prefer': 'return=minimal' },
        body: JSON.stringify({ cover_url }),
      });

      if (upRes.ok) updated.push(row.url);
      else errors.push({ url: row.url, reason: await upRes.text() });
    } catch (e) {
      errors.push({ url: row.url, reason: String(e) });
    }
  }

  return res.status(200).json({
    checked: articleUrls.length,
    already_in_db: existingUrls.size,
    new_found: newUrls.length,
    inserted: inserted.length,
    images_recovered: updated.length,
    articles: inserted,
    errors,
  });
}
