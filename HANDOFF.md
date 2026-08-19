# Handoff: ashmateu.com — Resumen Ejecutivo & Estado Técnico

**Meta**: Plataforma digital oficial de **Ash Mateu** (Directora Creativa de Moda y Fashion Stylist) en **Next.js 16.3.0 (Turbopack, App Router)**, **Tailwind CSS v4**, **TypeScript**, **GSAP ScrollTrigger**, **NVIDIA / Qwen AI**, y diseño de lujo editorial.

---

## 1. Ramas de Git & Entornos Activos

| Rama | Entorno / URL | Estado |
| :--- | :--- | :--- |
| **`main`** | **[ashmateu.com](https://ashmateu.com)** | ✅ Producción Oficial (100% limpia, sin calibradores residuales, con foto de París y SEO activo). |
| **`preview/sitio-completo`** | **[ashmateu-web.vercel.app](https://ashmateu-web.vercel.app)** | 🚀 Previsualización Activa con el nuevo **Luxury Bento Spread** en `#highlights`. |
| **`backup/pre-audit-restore-point`** | Backup en GitHub | 🔒 Punto de restauración seguro previo a la auditoría. |

---

## 2. Hitos Recientes Implementados

### 📸 1. Fotografía Master de Ash en París (`ash_paris_portrait_2026.jpg`)
- Retrato en alta resolución de Ash en París (Street Style con blazer bordó oversized, pañuelo de seda y bolso Gucci con adoquines de fondo).
- Aplicada en **Portada Principal (`HeroCover.tsx`)** y en **`HighlightsGrid.tsx`**.
- Eliminada por completo la foto vieja del salón de peluquería de todos los archivos y rutas.

### 🏛️ 2. Rediseño "Luxury Bento Spread" (`HighlightsGrid.tsx`)
- Implementado en `preview/sitio-completo` ([ashmateu-web.vercel.app/#highlights](https://ashmateu-web.vercel.app/#highlights)):
  - **Hero Bento Card (7 columnas)**: Foto vertical con micro-zoom, gran número `20` en *Bodoni Moda* itálica, manifiesto de carrera y etiqueta de lookbook (`📍 Paris Fashion Week · Haute Couture · Oversized Tailoring & Silk Archive Scarf`).
  - **3 Bento Cards Modulares (5 columnas)**:
    - *01 · +150 Tapas Dirigidas* (Acento borgoña `#4A1525` + preview).
    - *02 · Front Row NYFW & Paris* (Acento champagne `#C8A870` + preview).
    - *03 · 150k Insiders & Studio Exit* (Acento grafito `#1A1A1A` + badge Exit 2025).

### 🔍 3. Infraestructura SEO & Performance
- **Sitemap XML Dinámico**: `src/app/sitemap.ts` (`/sitemap.xml`) indexando todas las rutas y slugs de proyectos.
- **Robots.txt**: `src/app/robots.ts` (`/robots.txt`).
- **OpenGraph & Twitter Cards**: Imagen social oficial 1200×630px en `layout.tsx`.
- **JSON-LD Schema.org**: Estructura `Person` y `Organization` para Google Rich Results.
- **Favicon Oficial**: `public/favicon.ico` y `src/app/favicon.ico` para evitar errores 404.

### 🖼️ 4. Visor de Imágenes Full-Screen & Navegación Cruzada
- **Lightbox**: `src/components/ui/ImageLightboxModal.tsx` integrado en `/projects/[slug]`.
- **Project Navigation Footer**: Paginador de proyectos Anterior / Siguiente en `/projects/[slug]`.

### 📰 5. Ajustes de Prensa y Home
- **/prensa**: Sección de *Columnas & Artículos de Marie Claire* colocada arriba del *Archivo Histórico de Portadas*.
- **Carrusel Instagram 3D**: `showCaption={false}` para eliminar textos redundantes en el pie.
- **Limpieza de Producción**: Removido `UniversalImageCalibrator` de `layout.tsx` para garantizar HTML SSR puro sin mutaciones de cliente.

---

## 3. Próximos Pasos Disponibles

1. **Aprobar y pasar a producción el Luxury Bento Spread**:
   - Merge de `preview/sitio-completo` a `main` para que se vea en `ashmateu.com`.
2. **Nuevos ajustes estéticos**:
   - Cualquier calibración adicional de textos o imágenes según el feedback de Ash.
