# Handoff: ashmateu.com — Reconstrucción Next.js 16 + Tailwind CSS v4

**Meta**: Reconstrucción técnica y visual integral de ashmateu.com migrada a **Next.js 16.3.0 (App Router)** con **Tailwind CSS v4**, **TypeScript**, **React Server Components (RSC)**, **Zod**, **Supabase**, **GSAP ScrollTrigger** y diseño editorial fiel al PowerPoint `CORRECCIONES WEB 1 ash.com.pptx`.

---

## 1. Arquitectura y Stack Actual

- **Framework**: Next.js 16.3.0 (Turbopack, App Router, RSC, SSR/SSG).
- **Estilos**: Tailwind CSS v4 (`@tailwindcss/postcss`) con tokens de diseño de lujo.
- **Tipografía**: Bodoni Moda (Google Fonts) para títulos editoriales y Montserrat para textos geométricos.
- **Validación de Formularios**: Zod con esquema isomórfico (`src/lib/validations/contact.ts`) y endpoint API (`/api/contact`).
- **Gestión de Estado de URL**: `nuqs` con `<NuqsAdapter>` en el layout raíz para filtros de galería compartibles.
- **Interactividad & Motion**: GSAP ScrollTrigger (`src/components/animations/GsapReveal.tsx`).
- **Integración Vlog**: Supabase client (`src/lib/supabase/client.ts`) para playlist dinámica y videos de YouTube.
- **Contacto & WhatsApp**: Unificado en todos los componentes a **`+54 9 11 2382-3297`** (`https://wa.me/5491123823297`).

---

## 2. Mapa de Rutas & Navegación

- `/` (`src/app/page.tsx`):
  1. **HeroCover**: Fondo full-screen a 100vh (`/images/hero/hero_cover_pptx.webp`) con encuadre calibrado (20% de aire superior sobre la cabeza), título *"Styling people, brands and ideas."*, manifiesto y accesos a *MI HISTORIA* y *¿CÓMO TRABAJO?*.
  2. **HighlightsGrid (`#highlights`)**: Grilla de 11 hitos de carrera (Slide 6 del PPTX). Enlazado desde la navegación **`WHAT I DO?`**.
  3. **ServicesPillars**: Los 3 pilares de servicio (Dress to Kill, Empresas & Marcas, Consultoría & Speaker) + banner diferencial. Enlazado desde **`STYLING SERVICES`**.
  4. **EditorialGaleria**: 4 tarjetas de acceso a archivos editoriales.
  5. **PortfolioGallery**: Galería de 8 proyectos con RSC y filtrado por URL state.
  6. **VlogSection (`#vlog`)**: Reproductor y playlist interactiva.
  7. **ClientsStrip & InstagramStrip**: Marquee de marcas de lujo y diario visual de 6 fotos auténticas.
  8. **ContactForm (`#contacto`)**: Formulario con validación Zod y Optimistic UI.
- `/como-trabajo` (`src/app/como-trabajo/page.tsx`): Detalle completo de los 3 pilares de servicio con botones directos de WhatsApp para cotización.
- `/historia` (`src/app/historia/page.tsx`): Biografía completa de Ash, retratos de estudio Marie Claire y grilla de hitos.
- `/galeria` (`src/app/galeria/page.tsx`): Archivo visual completo y filtrado interactivo.
- `/blog` (`src/app/blog/page.tsx`): Artículos de investigación y macrotendencias.
- `/newsletter` (`src/app/newsletter/page.tsx`): Formulario de suscripción privada mensual y archivo completo de notas de investigación de Ash publicadas en la revista **Marie Claire Argentina** y **Blog & Trends**.
- `/prensa` (`src/app/prensa/page.tsx`): Archivo de más de 150 portadas producidas.
- `/projects/[slug]` (`src/app/projects/[slug]/page.tsx`): Páginas individuales para los 8 proyectos editoriales (Chanel HC, Valentina Ferrer, Leonie Hanne, Calu Rivero, Dolores Fonzi, Chanel Williamsburg, Netflix MF, Gucci Rural).

---

## 3. Reglas de Diseño e Imágenes

- **Regla de Rostros (20% Headroom)**: En cualquier componente con figuras humanas y retratos (`HeroCover`, `historia`, `PortfolioGallery`, `InstagramStrip`, `prensa`, `projects/[slug]`), la imagen debe utilizar `object-position: center 18%` (o `50% 15%`) garantizando que nunca se corten peinados ni cabezas y se mantenga ~20% de espacio libre superior.
- **Rama de Trabajo**: Todo el desarrollo y preview se mantiene en la rama **`preview/sitio-completo`**.
- **Comando de Push**: `env -u GITHUB_TOKEN git push origin preview/sitio-completo`.

---

## 4. Estado de Despliegue

- **Vercel Preview**: Despliegue automático configurado con `"framework": "nextjs"` en `vercel.json` y Next.js 16.3.0.
- **Local**: Corriendo en `http://localhost:3000`.
