# Handoff: ashmateu.com — Resumen Ejecutivo & Estado Técnico

**Meta**: Plataforma digital oficial de **Ash Mateu** (Directora Creativa de Moda y Fashion Stylist) desarrollada en **Next.js 16.3.0 (Turbopack, App Router)**, **Tailwind CSS v4**, **TypeScript**, **Framer Motion**, **GSAP ScrollTrigger**, **Lucide React**, y arquitectura de diseño *Warm Luxury*.

---

## 1. Entorno de Producción & Git

| Rama | Entorno / URL | Estado |
| :--- | :--- | :--- |
| **`main`** | **[ashmateu.com](https://ashmateu.com)** | ✅ **Producción Oficial Activa** (100% limpia, con nuevo orden de la Home, filtros en línea, tarjetas compactas, SEO completo y sin componentes residuales). |
| **`preview/sitio-completo`** | **[ashmateu-web.vercel.app](https://ashmateu-web.vercel.app)** | 🚀 Entorno de pruebas previo. |
| **`backup/pre-audit-restore-point`** | Backup en GitHub | 🔒 Snapshot de seguridad. |

---

## 2. Estructura Definitiva de la Home (`src/app/page.tsx`)

La página principal cuenta con una secuencia editorial optimizada y con todos sus badges numéricos correlativos sincronizados:

1. **`HeroCover.tsx`**: Portada a pantalla completa con fotografía editorial de alta costura de Ash en París (`/images/hero_studio/ash_paris_portrait_2026.jpg`) y selector de fotos de atelier.
2. **`HighlightsGrid.tsx`** (`02 · Hitos & Trayectoria`): Trayectoria de 20 años de dirección de moda, +150 tapas dirigidas, Front Row en NYFW & París, y 150k Exit.
3. **`InstagramStrip.tsx`** (`03 · Diario Visual & Coberturas`): Carrusel 3D Coverflow interactivo con crónicas visuales, fittings y backstages internacionales.
4. **`ServicesPillars.tsx`** (`04 · Modalidades de Trabajo`): 3 Pilares de servicios (`Dress to Kill`, `Styling & Producciones`, `Consultoría & Speaker`) con formato compacto y botones CTA elevados.
5. **`EditorialGaleria.tsx`** (`05 · Archivo Visual & Proyectos`): 4 accesos editoriales a Blog, Prensa, Galería y Metodología.
6. **`PortfolioGallery.tsx`** (`06 · Selección Curada`): Grilla asimétrica de Selected Works con filtros de categorías alineados horizontalmente en una sola fila.
7. **`VlogSection.tsx`** (`07 · Contenido Audiovisual & Masterclasses`): Reproductor de video y lista de episodios/masterclasses.
8. **`ClientsStrip.tsx`**: Grilla de marcas y publicaciones seleccionadas (Chanel, Louis Vuitton, Gucci, Marie Claire, Netflix, etc.).
9. **`ContactForm.tsx`** (`08 · Contacto & Bookings 2026`): Formulario atelier con efecto glassmorphism y botón directo a WhatsApp Concierge.

---

## 3. Hitos & Refinamientos Recientes (Agosto 2026)

### 📐 1. Compactación de Espaciado Vertical
- Se calibraron los paddings verticales de todas las secciones de la Home (`py-10 md:py-12 lg:py-16`, reduciendo los anteriores `py-28` / `py-32`) para lograr una navegación continua, fluida y sin vacíos excesivos.

### 🔘 2. Filtros de Portafolio en una Sola Línea (`PortfolioGallery.tsx`)
- Configurado con `flex-nowrap`, `whitespace-nowrap` y gap responsivo (`gap-3 sm:gap-4 md:gap-5 xl:gap-6`), garantizando que las 5 categorías (`Todo el Archivo`, `Haute Couture`, `Editorial & Portadas`, `Campañas & Marcas`, `Celebrity & Galas`) aparezcan siempre en una sola línea horizontal.

### 🎴 3. Tarjetas de Servicios Compactas y Botones Elevados (`ServicesPillars.tsx`)
- Se optimizó la altura de las fotografías (`h-32 sm:h-36 md:h-40`), se redujeron los márgenes internos y se elevaron los botones CTA (`CONOCER DRESS TO KILL`, `VER PRODUCCIONES & MARCAS`, `AGENDAR CONSULTORÍA O KEYNOTE`), permitiendo que el bloque de los 3 servicios entre en la pantalla sin requerir scroll forzado.

### 🧹 4. Limpieza de Experimentos Residuales
- Se eliminaron las rutas y componentes de prueba no seleccionados (`test-concierge`, `test-lookbook`, `VipBookingDrawer`, `EditorialLookbookPortal`), dejando la base de código 100% limpia y sin deuda técnica.

---

## 4. Knowledge Graph (`graphify-out/`)

- **Nodos & Aristas**: 332 nodos, 418 aristas, 33 comunidades estructuradas.
- **Archivos generados**:
  - `graphify-out/graph.html`: Visualizador interactivo 3D del grafo de arquitectura.
  - `graphify-out/graph.json`: Datos en formato GraphRAG.
  - `graphify-out/GRAPH_REPORT.md`: Reporte de abstracciones centrales (*God Nodes*) y conexiones del sistema.

---

## 5. Comandos de Verificación & Flujo de Trabajo

- **Desarrollo local**: `npm run dev` (disponible en `http://localhost:3000`).
- **Verificación de tipos**: `npx tsc --noEmit`.
- **Build de producción**: `npm run build` (25 rutas estáticas generadas con 0 errores).
- **Publicar cambios**: Al hacer push a la rama `main`, Vercel despliega automáticamente a [ashmateu.com](https://ashmateu.com).
