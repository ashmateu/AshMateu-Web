# Handoff: ashmateu.com todo operativo

**Meta**: Sitio de Ash Mateu en producción con blog, prensa y sync automático de Marie Claire.

**Hecho**: Sección Notas rediseñada con collage 3 imágenes por post, 9 posts con contenido editorial completo en DB, sync Marie Claire → Supabase press diario (cron 9am UTC vía Vercel), fix i18n (ES restaura correctamente al volver de EN/FR), formulario Formspree activo, post.html terminado con body completo, MCP Supabase autenticado y conectado.

**Siguiente**: No hay pendientes críticos. Opcional: agregar nuevos posts desde el dashboard de Supabase cuando Ash quiera publicar una nota nueva.

**Advertencia**: Cambios siempre a `develop` primero — mergear a `main` solo con OK explícito de Ash. Service key de Supabase en `~/.ashmateu_sb_key`, nunca en código. CRON_SECRET está en Vercel env vars (ver dashboard ashmateu-web).
