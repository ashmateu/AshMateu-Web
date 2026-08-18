# Handoff: ashmateu.com — Reconstrucción Next.js 16 + High-End Luxury Design System

**Meta**: Reconstrucción técnica y visual integral de ashmateu.com en **Next.js 16.3.0 (App Router)** con **Tailwind CSS v4**, **TypeScript**, **React Server Components (RSC)**, **GSAP ScrollTrigger**, **NVIDIA NIM AI / Qwen AI**, **Zod**, **Formspree**, **Supabase** y frameworks de diseño editorial de alta gama (**Stitch Design Taste**, **High-End Visual Design**, **UI/UX Pro Max**).

---

## 1. Estado Actual del Proyecto & Últimos Hitos

### 👑 REGLA INQUEBRANTABLE: Visibilidad Total del Rostro del Protagonista
- **Directiva**: Cada fotografía donde aparezca Ash Mateu, modelos o figuras destacadas **debe tener el rostro 100% visible, sin cortes de frente, cabello u ojos**.
- **Implementación Técnica**: Uso estricto de `object-cover object-[center_top]`, `object-[center_10%]` o `object-[center_15%]` en contenedores verticales o panorámicos (`next/image`), evitando `object-center` que corta la parte superior de los retratos.

---

### 🎨 Editor y Calibrador Universal de Fotos en Vivo (`UniversalImageCalibrator.tsx`)
- **Aislamiento 100% Foto por Foto**:
  - Cada imagen del sitio se identifica de forma única mediante un selector determinístico (`window.location.pathname::DOM_Path`).
  - Al calibrar o cambiar una foto, **solo se modifica el elemento seleccionado (resaltado con borde verde brillante)** sin afectar a ninguna otra imagen de la página.
- **Persistencia Permanente Invariable**:
  - Los ajustes de encuadre y reemplazos de fotos se guardan automáticamente en `localStorage` (`ash_site_image_slots_v5_permanent`).
  - Resistente a recargas, navegación entre páginas y montado asíncrono de componentes Next.js.
- **Explorador y Cambiador de Fotos Integrado (`Catalog Picker`)**:
  - Acceso directo a más de **910 fotografías y recursos de alta resolución** del catálogo (`src/lib/data/catalog_manifest.json`) divididos en 24 carpetas temáticas (*portadas*, *VALENTINA ZENERE*, *EMILIA ATTIAS*, *MODA CENTRAL PARK*, *ASH*, *RED CARPETS*, etc.).
  - Soporte para subir imágenes locales desde el dispositivo (`FileReader` a DataURL) o ingresar URLs personalizadas.
  - Sobrescritura forzada del atributo `srcset` interno de Next.js para actualización instantánea en el DOM.
- **Exportación Rápida**: Botón *Exportar Todo* que copia al portapapeles el resumen JSON de todos los cambios de encuadre y reemplazos.

---

### 🏛️ Rediseño Editorial de "Highlights de Carrera" (`HighlightsGrid.tsx`)
- **Coherencia y Armonía Estética con la Portada**:
  - Fondo en lino cálido (`#F7F3EE`), líneas divisorias de 1px dorado suave (`#B5A898/40`) y tipografía clásica de revista de moda (*Bodoni Moda / Playfair Display* itálica para números display y sans ligera para cuerpos de texto).
  - Eliminados los bloques oscuros y badges flotantes pesados para dar lugar a una presentación limpia, despojada y de alta costura.
- **Composición Editorial en 3 Bloques**:
  1. **Spread Principal (20 Años de Dirección de Moda)**:
     - Número monumental `20` en itálica fina, declaración de autor de Ash y retrato vertical en alta resolución (`/images/hero/hero_cover_pptx.webp`).
     - 3 pilares clave en el pie del spread: *01 · +150 Tapas Dirigidas*, *02 · NYFW & Haute Couture*, *03 · 150k Insiders Exit*.
  2. **4 Columnas Editoriales con Fotografía Limpia**:
     - *№ 01 · Debut Editorial 19 Años* (Editorial Perfil).
     - *№ 02 · Front Row Cover NYFW 2010* (Lincoln Center).
     - *№ 03 · +150 Tapas & Revistas* (Marie Claire, ¡HOLA!, etc.).
     - *№ 04 · 150k Community & Exit* (Ash Mateu Studio).
     - Todas las imágenes sin sellos ni cuadritos superpuestos, 100% limpias.
  3. **Metadata de Cierre**:
     - *01 · Residencia Global* (Buenos Aires · Nueva York · París · Londres · Dubái).
     - *02 · Celebrity Styling & Red Carpets* (Dolores Fonzi, Valentina Zenere, Griselda Siciliani, Delfi Chaves, Gimena Accardi).
     - *03 · Formación & Premios* (Central Saint Martins & Marangoni · 2x Martín Fierro & Premio Talento UP).

---

### 🎬 Portada Hero: Fotografía Editorial Pura & Calibración Fija (`HeroCover.tsx`)
- **Foto Master 4K Nativa**: `public/images/hero/hero_cover_pptx.webp`.
- **Encuadres Fijos en Código Fuente**:
  - Desktop: `x: 76%`, `y: 22%`, `zoom: 145%`, `brightness: 110%`.
  - Móvil: `x: 75%`, `y: 22%`, `zoom: 130%`, `brightness: 110%`.
- **Comportamiento Limpio**: Sin reproductor de video ni botones de toggle, conservando la pureza y elegancia de la fotografía estática con parallax suave al cursor.

---

### 🤖 Concierge Editorial VIP & Creative Briefing con IA (Qwen AI)
- **Motor de Inteligencia Artificial**:
  - Proveedor: **Alibaba Cloud DashScope Compatible** (`https://dashscope-intl.aliyuncs.com/compatible-mode/v1`).
  - Modelo Primario: `qwen-max` en modo **Streaming**.
  - Modelo Secundario / Fallback: `qwen-turbo`.
  - Configuración Singleton: `src/lib/qwen-ai.ts`.
  - Endpoint API: `src/app/api/concierge/route.ts` con respuesta chunked (`ReadableStream`).
- **Componente de Interfaz (`src/components/concierge/ConciergeDrawer.tsx`)**:
  - Activación contextual desde el banner en **Styling Services (`/como-trabajo`)**.
  - Exportación de briefing formateado directo a WhatsApp (`+54 9 11 2382-3297`).

---

### 🏷️ Isologos Oficiales de Marcas & Publicaciones
- Isologos vectoriales auténticos integrados: Chanel, Louis Vuitton, Gucci, Miu Miu, Dolce & Gabbana, Marie Claire, Nike, L'Oréal Paris, Mercedes-Benz, Netflix.
- Normalización óptica a `140px × 56px` con opacidad base `0.65` y hover a `1.0`.

---

### 📬 Integraciones & Contacto
- **Formulario de Contacto (`/api/contact`)**: Formspree ID `xeebjqpq`.
- **Newsletter (`/newsletter`)**: Formspree ID `mqaeavog`.
- **Correo Oficial Unificado**: `info@ashmateu.com`.

---

### 🛠️ Skills & Herramientas de Diseño Instaladas
- **`ui-ux-pro-max`**: Instalado en `.agents/skills/ui-ux-pro-max/` y `~/.gemini/config/skills/ui-ux-pro-max/` con motor de búsqueda local (79 estilos, 192 paletas, 74 font pairings, 119 reglas UX).
- **`open-design`**, **`stitch-design-taste`**, **`design-taste-frontend`**, **`graphify`**, **`handoff`**.

---

## 2. Mapa de Rutas y Arquitectura

| Ruta | Componente / Propósito | Estado |
| :--- | :--- | :--- |
| `/` | `src/app/page.tsx` — Hero, Highlights, Servicios, Galería, Vlog, Marcas, Contacto | ✅ 100% Producción |
| `/como-trabajo` | `src/app/como-trabajo/page.tsx` — 9 Cuadros de Styling Services + Concierge IA Banner | ✅ 100% Producción |
| `/galeria` | `src/app/galeria/page.tsx` — Editorial Fashion Gallery con filtros por categoría | ✅ 100% Producción |
| `/historia` | `src/app/historia/page.tsx` — Biografía, Manifiesto y trayectoria de Ash Mateu | ✅ 100% Producción |
| `/prensa` | `src/app/prensa/page.tsx` — Colección de Portadas y Notas de Prensa | ✅ 100% Producción |
| `/blog` | `src/app/blog/page.tsx` — Artículos de tendencias y macrotendencias de moda | ✅ 100% Producción |
| `/newsletter` | `src/app/newsletter/page.tsx` — Suscripción VIP semanal | ✅ 100% Producción |
| `/projects/[slug]` | `src/app/projects/[slug]/page.tsx` — Casos de estudio dinámicos SSG | ✅ 100% Producción |

---

## 3. URLs de Despliegue en Vivo

- **URL de Producción Canónica (Siempre actualizada)**:
  👉 **[https://ashmateu-web.vercel.app](https://ashmateu-web.vercel.app/)**
- **Ramas Git**: Sincronizadas y mergeadas en `preview/sitio-completo` y `main`.
