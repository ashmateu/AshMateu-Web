# Handoff: ashmateu.com — Tiendanube integrada + polish completo

**Meta**: Sitio de Ash Mateu con blog, prensa y mercadito headless de Tiendanube. Sesiones del 1-4 jul 2026: auditoría completa, integración Tiendanube (reemplazó el carrito propio), unificación de contacto a info@ashmateu.com, y barrido de polish con impeccable en el 100% del sitio. Todo commiteado y deployado hasta `0a0953ed`.

## Arquitectura actual del mercadito (cambió el 4 jul)

- **Catálogo**: se administra en el panel de Tiendanube (tienda `ashmateu2.mitiendanube.com`, store_id `7924900`). Los productos publicados aparecen solos en la web (caché 5 min).
- **`api/tn-products.js`**: proxy edge que llama a la API de Tiendanube. Quirks: header `Authentication: bearer` (no Authorization), `User-Agent` obligatorio, env vars con `.trim()`. Normaliza al shape del frontend y decodifica entidades HTML. Sin credenciales devuelve 503.
- **Credenciales**: `TN_STORE_ID` + `TN_ACCESS_TOKEN` en Vercel (Production) y en `.env` local (gitignoreado). Token completo en `~/.ashmateu_tn_token.json`. Client ID de la app partner: 35855. El token no expira salvo reinstalación de la app.
- **Checkout**: botón "Comprar" → página del producto en Tiendanube. **El carrito propio + MercadoPago fueron eliminados** (commit `e3d3c762`: drawer, JS, `api/mp-preference.js`, `api/mp-webhook.js`, modal de auth de mercadito que quedó huérfano). El pendiente `MP_WEBHOOK_SECRET` murió con ellos.
- **Fallback**: si Tiendanube está vacía/falla → productos de Supabase con botón "Consultar" → Instagram. Si ambos vacíos → estado vacío editorial ("El Mercadito está entre colecciones").
- Categoría con nombre "Digital" en Tiendanube → filtro Digital de la web; el resto es "Pieza".

## Hecho 4 jul (después de la integración Tiendanube)

**Contacto unificado**: 12 ocurrencias de ash.mateu@gmail.com → `info@ashmateu.com` en 7 archivos (index, mercadito, construccion, cuenta, auth-ui, js/i18n.js, api/tn-products.js). Formspree reconfigurado por el usuario. El email de LOGIN admin sigue siendo ash.mateu@gmail.com (es la cuenta Supabase, no tocar: `is_admin()` depende de él).

**Polish impeccable en todo el sitio** (index, mercadito, blog, blog/post, prensa, cuenta, 404, construccion, projects/ via case.css):
- Contraste AA en todo: placeholders de forms, footer-copy, tabs de auth, itálicas `--sand` sobre ivory → `--sand-text` (404 y construccion las tenían a 1.9:1).
- `:focus-visible` y `prefers-reduced-motion` en todas las páginas (CSS) y en `js/effects.js` (JS: Lenis/GSAP no se inicializan con la preferencia activa; los `gsap.from` nunca ocultan contenido).
- `blog/post.html` migrado de Playfair Display a **Bodoni Moda** (drift tipográfico grave).
- Estados de carga editoriales (serif itálica + pulso) en blog, prensa y mercadito; antes prensa quedaba en blanco durante la carga.
- `effects.js`: el toggle `.scrolled` del nav ya no depende de que cargue el CDN de Lenis (antes el nav quedaba transparente si Lenis fallaba).
- `scroll-margin-top: 96px` en secciones ancladas del index (#contacto quedaba tapado por el nav fijo).
- Easing unificado a expo-out `cubic-bezier(0.16,1,0.3,1)` en prensa.
- case.css cache-bust en `?v=4`.

**Imágenes (bugs de producción)**:
- CSP `img-src` ampliada a `https:` — las imágenes de prensa (fotos.perfil.com) y notas (pexels) estaban bloqueadas en producción. En local nunca se ve porque `python3 -m http.server` no manda headers CSP.
- Covers en DB migradas de URLs absolutas `https://ashmateu.com/images/...` a **relativas** `/images/...` (posts y press) — así son `'self'` en cualquier dominio incluidos previews de Vercel.
- **Regla de rostros** (pedido explícito, guardada en memoria): al recortar imágenes el rostro nunca se corta. Blog collage: `.collage-main img { object-position: center 20% }`, tercer crop `20%` si tiene imagen propia. Reemplazada imagen gris rota (chanel-hc/img-002.jpg, 17KB) por img-004.jpg en la nota chanel-y-el-peso-de-lo-real. Heros de mercadito y los 8 case studies verificados: todos ok (case.css ya tenía `center top`).

## Hecho 1 jul (auditoría, sigue vigente)

- RLS endurecido: migración `harden_rls_admin_only_writes` (escrituras solo `is_admin()`, sin lectura global de orders, bucket sin listado público).
- `esc()` anti-XSS en blog, blog/post, prensa y mercadito (todo dato de DB interpolado).
- CSP + HSTS en `vercel.json`. Newsletter con validación regex + constraint DB.
- Nav sin negrita permanente en "Mercadito"; skip-link oculto en projects/; placeholders tipográficos en prensa.
- Bebas Neue en woff2 (16K); gucci-rural/img-001.webp 668K→428K; og:image 436K→276K.

## Estado actual

- Working tree limpia, todo pusheado a `main` (`0a0953ed`). Vercel deploya automático desde main.
- **El dominio público sigue en modo construcción** (middleware.js redirige todo a /construccion). El sitio real se ve en `https://ashmateu-web.vercel.app` (URL estable del último deploy; las URLs con hash tipo `ashmateu-xxxx-...` son deploys congelados, no usar).
- Tiendanube funcionando de punta a punta, verificado con producto de prueba "Campera de cuero".
- Formspree entrega a info@ashmateu.com (verificado por el usuario con mensaje de prueba).

## Pendientes

1. Quitar `middleware.js` (o su redirección) cuando se lance el sitio.
2. Leaked password protection: Supabase dashboard → Auth → Password.
3. Ash tiene que cargar los productos reales en Tiendanube (hoy solo hay 1 de prueba) y configurar pagos/envíos en su panel.
4. Los critiques guardados de impeccable en `.impeccable/critiques/*.json` están desactualizados (anteriores a todos estos fixes); regenerarlos si se vuelven a usar.

## Instrucciones de reanudación

1. `git log --oneline -15` para ver la secuencia de commits del 4 jul.
2. Probar mercadito: `https://ashmateu-web.vercel.app/mercadito` → debe mostrar la campera de Tiendanube con botón "Comprar" que abre `ashmateu2.mitiendanube.com`. Sin carrito en el nav.
3. Probar endpoint: `curl https://ashmateu.com/api/tn-products` → 200 con JSON de productos. 503 = env vars rotas en Vercel; 502/401 = token inválido.
4. Blog y prensa: imágenes deben cargar todas (si no: revisar CSP img-src en vercel.json y que las URLs de DB sean relativas).

## Enfoques fallidos / gotchas

- Token Tiendanube en Vercel: pegarlo con salto de línea final rompe con 401 (por eso el `.trim()` en el código). El `pbcopy` de un `print` de Python incluye `\n`.
- `sips` genera JPG más grandes que el original con q65+ en imágenes con grano; usar resize + q55, o `cwebp` para WebP.
- `fontTools` sin brotli (PEP 668): usar `uvx --with brotli --from fonttools python -c "..."`.
- Screenshots tras `goto` inmediato capturan animaciones a medias o "Cargando..."; esperar 2-3s y scrollear.
- El browser local cachea HTML/CSS/JS agresivamente con python http.server: verificar con `?f=$(date +%s)` o chequear con `fetch(url, {cache:'reload'})`.
- La API de Tiendanube usa header `Authentication` (no `Authorization`); con `Authorization` devuelve 401 silencioso.

## Sistema i18n — para editar textos

- `data-i18n-override` en index.html (hero, bio, servicios, contacto): texto ES en HTML + traducciones EN/FR en `js/i18n.js`; editar ambos.
- `data-i18n` (nav, labels): solo en `js/i18n.js`.
- Blog/prensa leen de Supabase (`posts`, `press`); mercadito de Tiendanube (fallback `products` de Supabase).
- Casos y footer: HTML puro.

## Advertencias

- Cambios de nav requieren propagación a los 15+ archivos HTML, nunca solo index.html.
- Las policies RLS dependen de `public.is_admin()` (email hardcodeado); si Ash cambia de email de login, actualizar la función.
- Al colocar/recortar imágenes: el rostro siempre visible (regla en memoria `feedback-recorte-rostros`). Verificar con screenshot en el aspect-ratio real.
- Service key de Supabase en `~/.ashmateu_sb_key`; token Tiendanube en `~/.ashmateu_tn_token.json` y `.env` local; CRON_SECRET en Vercel. Nada de esto va al repo.
