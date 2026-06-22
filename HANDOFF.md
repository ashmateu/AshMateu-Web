# HANDOFF — ashmateu-web

## Meta
Sitio portfolio de Ash Mateu (stylist, directora creativa) en ashmateu.com.
Stack: HTML/CSS/JS puro, sin build system. Supabase para datos dinámicos. Vercel para deploy.

## Estado actual
Todo funcionando en producción. Branch `main` = live. Branch `develop` = trabajo activo.

---

## Arquitectura

### Stack
- HTML/CSS/JS puro, sin framework ni build system
- Supabase (REST API) para posts y press
- Vercel para deploy + cron jobs
- GitHub: `ashmateu/AshMateu-Web` — dos ramas: `develop` y `main`

### URLs
- Producción: `https://ashmateu.com`
- Preview develop: `https://ashmateu-web-git-develop-mrosso25486-7169s-projects.vercel.app`

### Tokens de diseño
```css
--black: #0A0A0A
--ivory: #F7F3EE
--sand:  #B5A898
--serif: 'Playfair Display', Georgia, serif
--sans:  'Inter', system-ui, sans-serif
```
Filtro de imagen: `brightness(0.88) contrast(1.06) saturate(0.78)`

---

## Supabase

- Proyecto: `jrxklahobxpxmtnncvst.supabase.co`
- Anon key (pública, frontend): `sb_publishable_8vdBzcFdNVhjtjK9a4ZE9A_FPmxsHhd`
- Service key: guardada en `~/.ashmateu_sb_key` (nunca hardcodear ni mostrar en código)

### Tabla `posts` (Notas — artículos que escribe Ash)
Campos: `id`, `slug`, `title`, `excerpt`, `cover_url`, `cover_url_2`, `cover_url_3`, `published_at`, `active`

9 posts activos (los crea Ash manualmente):
- el-guardarropa-que-no-falla
- la-imagen-que-conecta
- lo-que-un-set-ensena
- azul-como-lenguaje
- moda-argentina-lo-que-el-mundo-no-vio
- chanel-y-el-peso-de-lo-real
- cuando-el-arte-entra-al-set
- miu-miu-y-la-femineidad-que-incomoda
- calle-vitrina-y-moda-en-movimiento

Imágenes: `https://ashmateu.com/images/extracted/<editorial>/img-NNN.jpg`
Editoriales disponibles: calu-chinatown, chanel-hc, chanel-pap, dolores-fonzi, gucci-rural, leonie-dg, netflix-mf, valentina-miumiu

Las columnas `cover_url_2` y `cover_url_3` se agregaron via ALTER TABLE en el dashboard de Supabase. Si se resetea la DB volver a crearlas.

### Tabla `press` (Prensa — apariciones en medios)
Campos: `id`, `title`, `excerpt`, `cover_url`, `publication_date`, `publication`, `url`, `featured`, `active`

20 artículos activos, todos de Marie Claire Argentina. El campo `featured: true` muestra el artículo grande arriba.

---

## Secciones del sitio

| Página | Archivo | Fuente de datos |
|--------|---------|-----------------|
| Home | `index.html` | Sanity CMS + i18n |
| Prensa | `prensa.html` | Supabase `press` |
| Notas | `blog.html` | Supabase `posts` |
| Mercadito | `mercadito.html` | Estático + MP links |
| Proyectos | `projects/<nombre>/index.html` | Estático |

---

## Automatizaciones

### Sync Marie Claire → Supabase press
- Archivo: `api/sync-press.js` (Vercel serverless function)
- Cron: todos los días a las 9am UTC (`0 9 * * *` en `vercel.json`)
- Qué hace: scrapea `marieclaire.perfil.com/autores/ashmateu`, detecta artículos nuevos, los inserta en `press`
- Auth: requiere header `Authorization: Bearer <CRON_SECRET>`
- Para disparar manualmente:
  ```bash
  curl "https://ashmateu.com/api/sync-press" -H "Authorization: Bearer <CRON_SECRET>"
  ```
- Env vars necesarias en Vercel: `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `CRON_SECRET`

---

## Idiomas (i18n)

- Archivo: `js/i18n.js`
- Idiomas: ES (default), EN, FR
- Elementos `data-i18n`: siempre se traducen (nav, formulario, footer)
- Elementos `data-i18n-override`: contenido de Sanity (hero title, subtitle, about text)
  - El sistema cachea el HTML original en español en `_esCache` al cargar la página
  - Al volver a ES restaura desde el cache (fix aplicado 22 jun 2026 — antes quedaba pegado en EN/FR)
- Idioma guardado en `localStorage` con clave `ash_lang`

---

## MCP Supabase (configurado, pendiente autenticación)

Archivo `.mcp.json` en raíz del proyecto:
```json
{
  "mcpServers": {
    "supabase": {
      "type": "http",
      "url": "https://mcp.supabase.com/mcp?project_ref=jrxklahobxpxmtnncvst"
    }
  }
}
```
Para autenticar: correr `/mcp` en Claude Code → seleccionar `supabase` → hacer login.
Cuando esté autenticado Claude puede operar la DB directamente sin scripts ni service key.

---

## Workflow Git

**Regla estricta:** todos los cambios van a `develop` primero. Mergear a `main` solo cuando Ash dice "publicar" o "ok publicar".

```bash
# Publicar a producción
git checkout main && git merge develop && git push origin main && git checkout develop
```

---

## Pendientes

- [ ] **Auth MCP Supabase**: autenticar el servidor MCP en Claude Code (`/mcp` → supabase → login)
- [ ] **Formspree**: reemplazar `FORMSPREE_ID` en `index.html` con el ID real (email: ash.mateu@gmail.com)
- [ ] **post.html**: revisar que `/blog/post.html?slug=...` esté terminado (existe el link desde blog.html)

---

## Credenciales (nunca en código)

| Variable | Dónde | Para qué |
|----------|-------|----------|
| Service key Supabase | `~/.ashmateu_sb_key` | Scripts locales de DB |
| SUPABASE_SERVICE_KEY | Vercel env vars | api/sync-press.js |
| CRON_SECRET | Vercel env vars | Protege /api/sync-press |
| MP_ACCESS_TOKEN | Vercel env vars | MercadoPago |
| SUPABASE_URL | Vercel env vars | URL del proyecto Supabase |
