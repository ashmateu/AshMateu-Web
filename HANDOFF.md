# Handoff: ashmateu.com — Reconstrucción Next.js 16 + High-End Luxury Design System

**Meta**: Reconstrucción técnica y visual integral de ashmateu.com en **Next.js 16.3.0 (App Router)** con **Tailwind CSS v4**, **TypeScript**, **React Server Components (RSC)**, **GSAP ScrollTrigger**, **NVIDIA NIM AI (OpenAI SDK)**, **Zod**, **Formspree**, **Supabase** y frameworks de diseño editorial de alta gama (**Stitch Design Taste** + **High-End Visual Design**).

---

## 1. Estado Actual del Proyecto & Últimos Hitos

### 🤖 Concierge Editorial VIP & Creative Briefing con IA (NVIDIA NIM)
- **Motor de Inteligencia Artificial**:
  - Proveedor: **NVIDIA NIM** vía OpenAI SDK (`https://integrate.api.nvidia.com/v1`).
  - Modelo: `meta/llama-3.3-70b-instruct` (calibrado para respuestas sofisticadas de alta costura).
  - Configuración Singleton: `src/lib/nvidia-ai.ts`.
  - Endpoint API: `src/app/api/concierge/route.ts` con manejo robusto de errores y fallback editorial.
- **Componente de Interfaz (`src/components/concierge/ConciergeDrawer.tsx`)**:
  - Modal / Slide-over lateral con fondo marfil `#F7F3EE`, contrastes `#0A0A0A`, bordes capilares `#B5A898/40` y tipografía *Bodoni Moda*.
  - Disparador flotante discreto en esquina inferior con badge de alta costura e indicador pulsante.
  - Chips de consulta rápida (Campañas, Novias, Dirección Creativa, Consultoría).
  - Exportación con un click directo a WhatsApp (`https://wa.me/5491123823297`) con el brief formateado.
- **Banner Interactivo en Servicios**:
  - `src/components/concierge/ConciergeTriggerBanner.tsx` integrado en `/como-trabajo`.

### 🏛️ Highlights de Carrera: Diseño "Avant-Garde Editorial" (Stitch)
- **Collage Asimétrico en Grilla de 12 Columnas**:
  - Se eliminaron las cajas cuadradas y contenedores tradicionales, disponiendo los 11 hitos en una composición manual de pasarela sobre lienzo marfil (`#F7F3EE`).
  - **Separadores Capilares de 1px**: Cada hito se separa con una línea vertical tenue (`border-l border-[#B5A898]/40 pl-5 md:pl-6`).
  - **Escala al 70%**: Números display en *Bodoni Moda Italic* calibrados a `48px - 68px` (escala al 70%) para una integración equilibrada.
  - **Offsets Asimétricos Tighter**: Desplazamientos verticales y horizontales compactos (`md:mt-4`, `md:mt-8`, `md:mt-12`), logrando dinamismo sin vacíos innecesarios.

### 🏷️ Isologos Oficiales de Marcas & Publicaciones
- **Vectores Oficiales Integrados**: Se reemplazaron los nombres en texto por los isologos vectoriales auténticos de las 10 marcas colaboradoras:
  - **Chanel** (`chanel.webp`) — Doble C entrelazada y tipografía.
  - **Louis Vuitton** (`louis_vuitton.webp`) — Monograma LV y wordmark.
  - **Gucci** (`gucci.webp`) — Wordmark serif oficial corregido y centrado.
  - **Miu Miu** (`miu_miu.webp`) — Logotipo geométrico de bloque.
  - **Dolce & Gabbana** (`dolce_gabbana.webp`) — Logotipo con ampersand.
  - **Marie Claire** (`marie_claire.webp`) — Cabecera de revista oficial.
  - **Nike** (`nike.webp`) — Swoosh oficial.
  - **L'Oréal Paris** (`loreal.webp`) — Wordmark de belleza oficial.
  - **Mercedes-Benz** (`mercedes_benz.webp`) — Estrella de 3 puntas.
  - **Netflix** (`netflix.webp`) — Wordmark arqueado oficial.
- **Normalización Óptica**: Cada logo recortado a sus límites de píxel reales y alojado en contenedores homogéneos de `140px × 56px` con `opacity: 0.65` y hover a `1.0`.

### 📬 Integraciones de Automatización & Formspree
- **Formulario de Contacto (`/api/contact`)**:
  - Conectado con el Form ID oficial de Formspree **`xeebjqpq`** (`https://formspree.io/f/xeebjqpq`).
  - Cada envío valida los datos con Zod y los reenvía de forma inmediata al correo de Ash Mateu.
- **Suscripción a Newsletter (`/newsletter`)**:
  - Conectado al Form ID oficial de Formspree **`mqaeavog`** (`https://formspree.io/f/mqaeavog`).

### ✉️ Unificación de Correo Electrónico
- Correo oficial unificado en **`info@ashmateu.com`**:
  - **ContactForm**: Enlace directo y visualización de `info@ashmateu.com`.
  - **Footer**: Enlace directo `mailto:info@ashmateu.com` con icono vectorial.
  - **Navbar Mobile Drawer**: Enlace directo `mailto:info@ashmateu.com`.

### 🎯 Optimización de Conversión & Click-Paths
- **`¿Cómo Trabajo?` (`/como-trabajo`)**:
  - Se agregaron botones de acción rápida directos a WhatsApp con mensajes pre-cargados en **todos los pilares** (Novias, Galas, Imagen Personal, Fiestas, Campañas de Marca, Styling Editorial, Branding y Speaker Keynotes).
- **`Trends & Blog` (`/blog`)**:
  - Artículos y portadas con enlaces interactivos que conectan a `/prensa`, `/newsletter` y servicios afines.

### 📏 Compactación Integral de Distancias y Rellenos
- Se redujeron sistemáticamente los rellenos verticales en todas las secciones para un ritmo de navegación ágil y cómodo:
  - **Highlights**: `py-16 md:py-20 lg:py-24`.
  - **¿Cómo Trabajo? (3 Pilares)**: `py-16 md:py-20 lg:py-24`.
  - **Galería Editorial**: `py-16 md:py-20 lg:py-24`.
  - **Selected Works (Portfolio)**: `py-16 md:py-20 lg:py-24`.
  - **Vlog & Redes**: `py-16 md:py-20 lg:py-24`.
  - **Marcas & Instagram**: `py-12 md:py-16 lg:py-20`.
  - **Formulario de Contacto**: `py-16 md:py-20 lg:py-24`.

### 📸 Hero Cover & Background 4K Nativo
- **Master Image**: Fotografía editorial 4K UHD nativa (`3840 × 2160 px`) en `public/images/hero/hero_cover_pptx.webp`.
- **Encuadres Calibrados**:
  - **Móvil (9:16 vertical)**: Centrado en el rostro de la modelo (`X: 70%`, `Y: 22%`, `Zoom: 100%`).
  - **Desktop (16:9 horizontal)**: Encuadre panorámico con aire superior (`X: 50%`, `Y: 20%`, `Zoom: 100%`).
- **Luminosidad**: `brightness(115%) contrast(1.03) saturate(1.04)`.
- **Panel Interactivo de Calibración**: Disponible en `HeroCover.tsx` para ajustes en vivo con guardado en `localStorage`.

### ⚡ Animaciones de Scroll (GSAP ScrollTrigger)
- **Efecto Híbrido**: Foco Óptico Blur (`blur(5px)` ➔ `blur(0px)`) + Micro-Zoom (`scale: 0.97` ➔ `1.0`) + micro-desplazamiento de `10px`.
- **Velocidad**: `duration: 0.55s` con curva `power2.out` y `start: "top 88%"`.

### 🟢 Botón y Enlaces de WhatsApp
- Isotipo oficial y texto en `#25D366` en `Navbar.tsx` y `Footer.tsx`.
- Teléfono directo unificado: **`+54 9 11 2382-3297`** (`https://wa.me/5491123823297`).

---

## 2. Ramas de Git y Resguardo

- **Rama de Trabajo Activa**: `preview/sitio-completo`.
- **Rama de Backup**: `backup/antes-de-papel-notas` (apunta al commit `f0d794fe` con tarjetas blancas previas).
- **Comando de Push**: `env -u GITHUB_TOKEN git push origin preview/sitio-completo`.
- **Vercel Preview**: [ashmateu-web-git-preview-siti-c3f8cd-mrosso25486-7169s-projects.vercel.app](https://ashmateu-web-git-preview-siti-c3f8cd-mrosso25486-7169s-projects.vercel.app/)

---

## 3. Arquitectura y Stack

- **Framework**: Next.js 16.3.0 (Turbopack, App Router, RSC, SSR/SSG).
- **IA & Concierge**: NVIDIA NIM vía OpenAI SDK (`meta/llama-3.3-70b-instruct`) con streaming y fallback editorial.
- **Estilos**: Tailwind CSS v4 con tokens de diseño editorial (`globals.css`).
- **Tipografía**: Bodoni Moda (Google Fonts) para display numbers y títulos de pasarela; Montserrat para etiquetas de catálogo; Inter para textos de lectura.
- **Validación de Formularios & Email**: Zod con esquema isomórfico (`src/lib/validations/contact.ts`), API Route (`/api/contact`) y despacho a Formspree (`xeebjqpq`).
- **Gestión de Estado de URL**: `nuqs` con `<NuqsAdapter>` en el layout raíz para filtros de galería compartibles.
- **Interactividad & Motion**: GSAP ScrollTrigger (`src/components/animations/GsapReveal.tsx`).
- **Prensa & Columnas**: Conexión a Supabase (`src/lib/data/press.ts`) con 21 artículos reales de Marie Claire Argentina (`marieclaire.perfil.com`).

---

## 4. Mapa de Rutas

- `/` (`src/app/page.tsx`): HeroCover, HighlightsGrid, ServicesPillars, EditorialGaleria, PortfolioGallery, VlogSection, ClientsStrip, InstagramStrip, ContactForm.
- `/como-trabajo` (`src/app/como-trabajo/page.tsx`): 3 pilares de servicio con cotización directa + Banner Concierge IA.
- `/historia` (`src/app/historia/page.tsx`): Biografía, retratos Marie Claire y trayectoria.
- `/galeria` (`src/app/galeria/page.tsx`): Archivo visual interactivo con filtros URL (`nuqs`).
- `/blog` (`src/app/blog/page.tsx`): Tendencias y macrotendencias editoriales.
- `/newsletter` (`src/app/newsletter/page.tsx`): Suscripción y artículos de investigación.
- `/prensa` (`src/app/prensa/page.tsx`): Tapas y notas en Marie Claire.
- `/projects/[slug]` (`src/app/projects/[slug]/page.tsx`): Páginas individuales para 8 proyectos editoriales.
- `API Routes`:
  - `POST /api/contact`: Validación Zod y despacho a Formspree.
  - `POST /api/concierge`: Inferencia con NVIDIA NIM OpenAI SDK.
