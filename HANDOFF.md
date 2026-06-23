# Handoff: ashmateu.com todo operativo

**Meta**: Sitio de Ash Mateu en producción con blog, prensa, mercadito y sync automático de Marie Claire.

**Hecho**:
- Sección Notas rediseñada con collage 3 imágenes por post, 9 posts con contenido editorial completo en DB
- Sync Marie Claire → Supabase press diario (cron 9am UTC vía Vercel)
- Fix i18n (ES restaura correctamente al volver de EN/FR)
- Formulario Formspree activo (ID: `xeebjqpq`)
- post.html terminado con body completo
- MCP Supabase autenticado y conectado
- Favicon SVG monograma "AM" (negro/ivory) en todas las páginas
- 404.html branded con nav, título Bodoni Moda y CTAs
- og:image + twitter:card agregados en blog.html, prensa.html, mercadito.html y subpáginas projects/
- noindex en auth-ui.html y 404.html
- Fix descender "g" en hero title: font-size reducido + `padding-bottom: 0.2em; overflow: visible` en `.hero-title`
- Contraste WCAG AA: `--sand-text: #7A6A5A` (4.75:1) para texto sobre fondos claros en index.html, css/case.css, blog.html, prensa.html, mercadito.html. `--sand: #B5A898` se conserva para elementos sobre fondos oscuros

**Estado actual**: main y develop sincronizados y pusheados a GitHub. Vercel despliega desde main automáticamente.

**Siguiente**: No hay pendientes críticos. Opcional: agregar nuevos posts desde el dashboard de Supabase cuando Ash quiera publicar una nota nueva.

**Sistema i18n — importante para editar textos**:
- Elementos con `data-i18n-override` en index.html (hero title, bio, servicios, contact headline) tienen el texto ES en el HTML y las traducciones EN/FR en `js/i18n.js`. Si se edita el HTML, hay que actualizar también `js/i18n.js` para que EN/FR coincidan.
- Elementos con `data-i18n` (nav links, labels de formulario) solo se editan en `js/i18n.js`.
- El contenido del blog viene de Sanity CMS (proyecto `p3c01d1l`, dataset `production`), no del HTML.
- Todo lo demás (prensa, mercadito, casos, footer) es HTML puro — editar directamente el `.html`.

**Advertencia**: Cambios siempre a `develop` primero — mergear a `main` solo con OK explícito "PASAMOS A MAIN". Service key de Supabase en `~/.ashmateu_sb_key`, nunca en código. CRON_SECRET está en Vercel env vars (ver dashboard ashmateu-web).
