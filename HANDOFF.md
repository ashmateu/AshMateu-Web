# Handoff: ashmateu.com — Reconstrucción Next.js 16 + High-End Luxury Design System

**Meta**: Reconstrucción técnica y visual integral de ashmateu.com en **Next.js 16.3.0 (App Router)** con **Tailwind CSS v4**, **TypeScript**, **React Server Components (RSC)**, **GSAP ScrollTrigger**, **Zod**, **Supabase** y frameworks de diseño editorial de alta gama.

---

## 1. Estado Actual del Proyecto & Últimos Hitos

### 📸 Hero Cover & Background 4K Nativo
- **Master Image**: Integrada la fotografía editorial 4K UHD nativa (`3840 × 2160 px`) en `public/images/hero/hero_cover_pptx.webp`.
- **Encuadre Calibrado y Responsive**:
  - **Móvil (9:16 vertical)**: Centrado en el rostro y busto de la modelo (`X: 70%`, `Y: 22%`, `Zoom: 100%`).
  - **Desktop (16:9 horizontal)**: Encuadre panorámico con aire superior (`X: 50%`, `Y: 20%`, `Zoom: 100%`).
- **Iluminación & Luminosidad**: Calibrada a `brightness(115%) contrast(1.03) saturate(1.04)` con degradé superior transparente y fondo azul luminoso.
- **Panel de Calibración en Vivo**: `HeroCover.tsx` incluye panel interactivo con sliders de X, Y, Zoom (hasta 300%), Brillo y pestañas independientes para Móvil / Desktop con persistencia en `localStorage`.

### 📝 Highlights de Carrera (Notas de Papel de Colores / Moodboard Editorial)
- Las 11 tarjetas de carrera se rediseñaron con estética de **notas de papel y papelería de atelier**:
  - Paleta pastel suave: Rosa blush (`#FDF0F4`), Amarillo mantequilla (`#FEFAE8`), Menta salvia (`#EFF7F2`), Lavanda (`#F5F0FB`), Azul cielo (`#EDF5FD`), Durazno (`#FFF2EB`) y Marfil (`#FAF7F0`).
  - Tiras de cinta washi tape translúcida (`repeating-linear-gradient`).
  - Clips metálicos dorados en tarjetas destacadas.
  - Inclinaciones orgánicas (`-1.2°`, `+1.4°`, `-0.6°`) que se alinean al hacer hover (`hover:rotate-0`).
  - Tipografía oscura ultra legible (`#121212`) con números serif y stickers para celebridades/ciudades.

### ⚡ Animaciones de Scroll (GSAP ScrollTrigger)
- **Efecto Híbrido**: Combinación de **Foco Óptico Blur** (`blur(5px)` ➔ `blur(0px)`) + **Micro-Zoom de Profundidad** (`scale: 0.97` ➔ `scale: 1.0`) + micro-elevación de `10px`.
- **Velocidad Optimizada**: `duration: 0.55s` con curva `power2.out`.
- **Punto de Activación**: `start: "top 88%"` (se activa suavemente al entrar por la parte baja de la pantalla).
- **Rendimiento**: Aceleración por hardware con `will-change: transform, opacity, filter`.

### 🟢 Botón y Enlaces de WhatsApp
- Color de marca oficial de WhatsApp **`#25D366`** aplicado al icono vectorizado y al texto en `Navbar.tsx` y `Footer.tsx`.
- Teléfono directo unificado en todo el sitio: **`+54 9 11 2382-3297`** (`https://wa.me/5491123823297`).

### 🏷️ Logotipo Oficial
- Logotipo oficial de **Ash Mateu Prieto** (*creative director — STYLING & CREATIVE DIRECTION*) restaurado en alta definición en `public/images/logo/ash_mateu_logo_white.webp` con un 30% más de escala para presencia de marca.

---

## 2. Backup de Seguridad Creado

Para comparar con Ash la versión anterior (tarjetas blancas minimalistas) vs la versión actual (notas de papel de colores):
- **Rama de Backup**: `backup/antes-de-papel-notas` (apunta al commit `f0d794fe`).
- **Rama Activa**: `preview/sitio-completo`.
- **Para restaurar la versión anterior con 1 comando**: `git checkout backup/antes-de-papel-notas` o cherry-pick/merge según decisión de Ash.

---

## 3. Arquitectura y Stack

- **Framework**: Next.js 16.3.0 (Turbopack, App Router, RSC, SSR/SSG).
- **Estilos**: Tailwind CSS v4 con tokens de diseño de lujo (`globals.css`).
- **Tipografía**: Bodoni Moda (Google Fonts) para títulos de alta costura y Montserrat para textos geométricos e índices técnicos.
- **Validación de Formularios**: Zod con esquema isomórfico (`src/lib/validations/contact.ts`) y endpoint API (`/api/contact`).
- **Gestión de Estado de URL**: `nuqs` con `<NuqsAdapter>` en el layout raíz para filtros de galería compartibles.
- **Interactividad & Motion**: GSAP ScrollTrigger (`src/components/animations/GsapReveal.tsx`).
- **Prensa & Columnas**: Conexión a Supabase (`src/lib/data/press.ts`) con 21 artículos reales de Marie Claire Argentina (`marieclaire.perfil.com`).

---

## 4. Mapa de Rutas

- `/` (`src/app/page.tsx`): HeroCover, HighlightsGrid, ServicesPillars, EditorialGaleria, PortfolioGallery, VlogSection, ClientsStrip, InstagramStrip, ContactForm.
- `/como-trabajo` (`src/app/como-trabajo/page.tsx`): 3 pilares de servicio con cotización directa.
- `/historia` (`src/app/historia/page.tsx`): Biografía, retratos Marie Claire y trayectoria.
- `/galeria` (`src/app/galeria/page.tsx`): Archivo visual interactivo con filtros URL (`nuqs`).
- `/blog` (`src/app/blog/page.tsx`): Tendencias y macrotendencias editoriales.
- `/newsletter` (`src/app/newsletter/page.tsx`): Suscripción y artículos de investigación.
- `/prensa` (`src/app/prensa/page.tsx`): Tapas y notas en Marie Claire.
- `/projects/[slug]` (`src/app/projects/[slug]/page.tsx`): Páginas individuales para 8 proyectos editoriales.

---

## 5. Reglas de Git y Despliegue

- **Rama de Trabajo Activa**: `preview/sitio-completo`.
- **Rama de Backup**: `backup/antes-de-papel-notas`.
- **Comando de Push**: `env -u GITHUB_TOKEN git push origin preview/sitio-completo`.
- **Vercel Preview**: [ashmateu-web-git-preview-siti-c3f8cd-mrosso25486-7169s-projects.vercel.app](https://ashmateu-web-git-preview-siti-c3f8cd-mrosso25486-7169s-projects.vercel.app/)
