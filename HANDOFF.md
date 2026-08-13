# Handoff: ashmateu.com — Reconstrucción Next.js 16 + High-End Luxury Design System

**Meta**: Reconstrucción técnica y visual integral de ashmateu.com en **Next.js 16.3.0 (App Router)** con **Tailwind CSS v4**, **TypeScript**, **React Server Components (RSC)**, **Zod**, **Supabase**, **GSAP ScrollTrigger** y los frameworks de diseño de alta gama: **Stitch Design Taste** + **High-End Visual Design** + **Brandkit**.

---

## 1. Arquitectura y Stack Actual

- **Framework**: Next.js 16.3.0 (Turbopack, App Router, RSC, SSR/SSG).
- **Estilos**: Tailwind CSS v4 con tokens de diseño de lujo (`globals.css`).
- **Tipografía**: Bodoni Moda (Google Fonts) para títulos de alta costura y Montserrat para textos geométricos e índices técnicos.
- **Micro-interacciones**: Patrón *Button-in-Button* (micro-cápsulas circulares con flecha diagonal `↗`), arquitectura *Double-Bezel*, estados hover con elevación táctil y transiciones fluidas.
- **Validación de Formularios**: Zod con esquema isomórfico (`src/lib/validations/contact.ts`) y endpoint API (`/api/contact`).
- **Gestión de Estado de URL**: `nuqs` con `<NuqsAdapter>` en el layout raíz para filtros de galería compartibles.
- **Interactividad & Motion**: GSAP ScrollTrigger (`src/components/animations/GsapReveal.tsx`).
- **Integración de Prensa & Newsletter**: Conexión a Supabase (`src/lib/data/press.ts`) para cargar las 21 columnas y coberturas reales escritas por Ash para la revista **Marie Claire Argentina** con enlaces directos (`marieclaire.perfil.com`).
- **Contacto & WhatsApp**: Unificado en todos los componentes a **`+54 9 11 2382-3297`** (`https://wa.me/5491123823297`).

---

## 2. Mapa de Rutas & Componentes de Alta Gama

- `/` (`src/app/page.tsx`):
  1. **Navbar**: Cápsula de cristal flotante (`backdrop-blur-2xl bg-[#0a0a0a]/90`), enlace directo a WhatsApp con micro-cápsula y navegación sincronizada.
  2. **HeroCover**: Fondo full-bleed a 100vh con encuadre calibrado (20% de aire superior sobre la cabeza), micro-badge `ASH MATEU PRIETO`, título con punto dorado y botones de acción anidados.
  3. **HighlightsGrid (`#highlights`)**: Grilla asimétrica bento con marcadores técnicos `№ 01` a `№ 11`, tarjetas dobles de hito (*Inside Studios Exit 2025*, *Red Carpets*, *Ciudades Globales*) y gran tarjeta final de 20 años de carrera.
  4. **ServicesPillars**: Los 3 pilares de servicio (Dress to Kill, Empresas & Marcas, Consultoría & Speaker) con placas de monografía `#FAF7F2` y banner de diferencial en negro azabache.
  5. **EditorialGaleria**: 4 tarjetas de acceso a archivos editoriales en placas oscuras con botón de enlace interno.
  6. **PortfolioGallery**: Galería de 8 proyectos con RSC, filtrado por URL state y botones Button-in-Button.
  7. **VlogSection (`#vlog`)**: Marco de teatro de cine con botón de play en oro champagne y micro-indicadores activos.
  8. **ClientsStrip & InstagramStrip**: Marcas de lujo con separadores geométricos `◆` y diario visual con sellos de ciudades (*PARIS, NYC, MILAN, VENEZIA, BA*).
  9. **ContactForm (`#contacto`)**: Formulario con validación Zod, entradas de texto de alto contraste y tarjeta de contacto directo.
- `/como-trabajo` (`src/app/como-trabajo/page.tsx`): Detalle completo de los 3 pilares de servicio con botones directos de WhatsApp para cotización.
- `/historia` (`src/app/historia/page.tsx`): Biografía completa de Ash, retratos de estudio Marie Claire y grilla de hitos.
- `/galeria` (`src/app/galeria/page.tsx`): Archivo visual completo y filtrado interactivo.
- `/blog` (`src/app/blog/page.tsx`): Artículos de investigación y macrotendencias.
- `/newsletter` (`src/app/newsletter/page.tsx`): Formulario de suscripción privada mensual y archivo completo de notas de investigación de Ash publicadas en la revista **Marie Claire Argentina** y **Blog & Trends**.
- `/prensa` (`src/app/prensa/page.tsx`): Archivo de portadas producidas y artículos publicados.
- `/projects/[slug]` (`src/app/projects/[slug]/page.tsx`): Páginas individuales para los 8 proyectos editoriales.

---

## 3. Reglas de Git y Despliegue

- **Rama de Trabajo**: Todo el desarrollo y preview se mantiene en la rama **`preview/sitio-completo`**.
- **Comando de Push**: `env -u GITHUB_TOKEN git push origin preview/sitio-completo`.
- **Vercel Preview**: Despliegue automático configurado con `"framework": "nextjs"` en `vercel.json` y Next.js 16.3.0.
