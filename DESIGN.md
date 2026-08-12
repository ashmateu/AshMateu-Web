---
name: Ash Mateu
description: Portfolio editorial de una directora creativa que no necesita explicarse.
colors:
  black: "#0A0A0A"
  ivory: "#F7F3EE"
  white: "#FFFFFF"
  sand: "#B5A898"
  sand-text: "#7A6A5A"
  body-text: "#444444"
  placeholder: "#EDE9E3"
typography:
  display:
    fontFamily: "'Bodoni Moda', Georgia, serif"
    fontSize: "clamp(44px, 5.2vw, 76px)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.015em"
  editorial-headline:
    fontFamily: "'Bebas Neue', sans-serif"
    fontSize: "clamp(72px, 10vw, 152px)"
    fontWeight: 400
    lineHeight: 0.88
    letterSpacing: "-0.02em"
  title:
    fontFamily: "'Bodoni Moda', Georgia, serif"
    fontSize: "clamp(22px, 2.5vw, 32px)"
    fontWeight: 400
    lineHeight: 1.2
  body:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 300
    lineHeight: 1.7
    letterSpacing: "0.012em"
  label:
    fontFamily: "'Montserrat', sans-serif"
    fontSize: "10px"
    fontWeight: 500
    letterSpacing: "0.18em"
rounded:
  none: "0px"
spacing:
  gutter: "56px"
  gutter-mobile: "24px"
  section: "72px"
  grid-seam: "3px"
components:
  cta-primary:
    textColor: "{colors.black}"
    typography: "{typography.label}"
    padding: "0 0 3px 0"
  cta-primary-hover:
    textColor: "{colors.black}"
    backgroundColor: "transparent"
  nav-link:
    textColor: "{colors.black}"
    typography: "{typography.label}"
  nav-link-scrolled:
    backgroundColor: "rgba(247,243,238,0.96)"
  work-item:
    backgroundColor: "{colors.ivory}"
    rounded: "{rounded.none}"
  case-next:
    backgroundColor: "{colors.black}"
    textColor: "{colors.white}"
    padding: "80px 56px"
---

# Design System: Ash Mateu

## 1. Overview

**Creative North Star: "La Edición Silenciosa"**

Este sistema no diseña para impresionar, diseña para hacer invisible al diseño. La interfaz es el marco, nunca el cuadro. Cada decisión tipográfica, cada valor de espaciado, cada transición existe para que el trabajo de Ash Mateu ocupe el centro sin competencia.

La paleta es casi monocromática: negro profundo contra marfil cálido, con una sola nota de arena para las jerarquías secundarias. No hay acento de color. No hay gradientes. No hay ornamentación. La sofisticación viene del ritmo tipográfico y del tratamiento fotográfico, no de la decoración.

El sistema rechaza la estética de portafolio genérico: no hay grids uniformes de tarjetas, no hay efectos de entrada que distraigan del contenido, no hay tipografía sans-serif fría que grite "plataforma digital". Lo que hay es una voz editorial silenciosa y precisa, como la de una directora que sabe exactamente qué incluir y qué descartar.

**Key Characteristics:**
- Paleta de dos tonos con acento arena; sin color de marca saturado
- Cuatro familias tipográficas con roles estrictamente diferenciados
- Sin bordes redondeados. Ninguno.
- Grid editorial de 12 columnas con juntas de 1–3px (sin gutter visible entre imágenes)
- Imagen siempre filtrada: `brightness(0.88) contrast(1.06) saturate(0.78)`
- Motion restrainado: expo-out en todo, cero bounce

## 2. Colors

Dos tonos base, una nota de arena, sin saturación deliberada.

### Primary
- **Negro Profundo** (`#0A0A0A`): Color de texto principal y fondo de secciones de contraste (contacto, pie, menú mobile). Casi negro absoluto con un matiz mínimamente cálido.

### Neutral
- **Marfil Editorial** (`#F7F3EE`): Fondo principal del sitio. Blanco roto con leve temperatura cálida que ancla el sistema lejos del frío digital. No es crema genérica — es el tono de papel de alta gramaje.
- **Blanco Superficie** (`#FFFFFF`): Fondo de bloques de texto en case studies (`case-block-text`). Crea separación leve del marfil sin romper la paleta.
- **Arena Muted** (`#B5A898`): Usado exclusivamente para labels de categoría, elementos de logo secundarios, divisores, y estados no activos de íconos. Nunca como color de acento dominante.
- **Arena Texto** (`#7A6A5A`): Variante oscura de arena para texto de metadatos, credits, labels en fondos claros. Cumple 4.5:1 contra ivory.
- **Texto Body Case** (`#444444`): Texto de párrafo en case studies sobre fondo blanco. Mayor contraste que usar opacity sobre negro.
- **Placeholder Imagen** (`#EDE9E3`): Background de contenedores de imagen mientras cargan.

### Named Rules
**La Regla del Color Ausente.** No existe un color de acento saturado en este sistema. La arena (`#B5A898`) cumple el rol de "color de marca" pero intencionalmente muted. Cualquier elemento que necesite destacar lo logra a través del tamaño o el espacio, nunca a través del color.

**La Regla de la Opacidad.** Antes de agregar un nuevo color, verificar si `opacity: 0.55` sobre un color existente resuelve el problema. El sistema usa opacity extensivamente para crear jerarquía sin expandir la paleta.

## 3. Typography

**Display Font:** Bodoni Moda (con `Georgia, serif` fallback)
**Body Font:** Inter (con `system-ui, sans-serif` fallback)
**Identifier Font:** Montserrat (ultrablack 900 para "ASH", ultralight 100/200 para subtítulos)
**Editorial Headline Font:** Bebas Neue (condensado, secciones de impacto únicamente)

**Character:** El sistema vive en el eje serif editorial + sans geométrico moderno. Bodoni Moda como display aporta temperatura y carácter de revista de lujo; Inter como body aporta legibilidad sin personalidad propia. La tensión entre los dos es intencional. Montserrat en extremos de peso (100 y 900) define la identidad del logo.

### Hierarchy
- **Display** (Bodoni Moda, 400, `clamp(44px, 5.2vw, 76px)`, lh 1.05, ls -0.015em): Títulos hero y encabezados de sección principales. Casi siempre en romano, nunca en negrita.
- **Editorial Headline** (Bebas Neue, 400, `clamp(72px, 10vw, 152px)`, lh 0.88, ls -0.02em): Una sola aparición por página — la sección "Directora" en la homepage. Nunca repetir este tamaño.
- **Title** (Bodoni Moda, 400, `clamp(22px, 2.5vw, 32px)`, lh 1.2): Subtítulos de case study, case intro lede en itálica, "next project" links.
- **Body** (Inter, 300, 16px, lh 1.65–1.75, ls 0.012em): Todo texto de párrafo. Weight 300 (light) como default, 400 para énfasis. Máx line-length: 560px (~65ch).
- **Label** (Montserrat, 500, 9–11px, ls 0.14–0.24em, uppercase): Metadatos de portfolio, credits, sección labels, nav links. El tracking extremo compensa el tamaño mínimo.

### Named Rules
**La Regla del 400.** Bodoni Moda en este sistema siempre es weight 400 (regular) o 300 (light). Nunca bold, nunca 800. La elegancia de la Bodoni está en el contraste de trazo; engrosarla destruye ese contraste.

**La Regla del Cuatro Familias.** El sistema tiene cuatro familias con roles fijos. Agregar una quinta familia requiere eliminar una existente o justificar el rol. No hay "quinta fuente decorativa".

## 4. Elevation

El sistema es plano por defecto. No existen `box-shadow` en ningún componente. La profundidad se construye de dos formas: superposición de imágenes (la imagen flotante del hero sobre la imagen principal, separada por un outline en color ivory) y contraste tonal de fondo (ivory → white → black como "capas" de superficie).

La única sombra presente es un `drop-shadow` funcional en el ícono de play del video de YouTube, para garantizar visibilidad sobre cualquier thumbnail.

### Named Rules
**La Regla de la Superficie Plana.** Ningún componente tiene `box-shadow`. Si un elemento necesita separarse, lo logra a través del color de fondo, el borde de 1px en arena, o la posición en el layout. Las sombras pertenecen a otra estética.

**La Regla del Outline Ivory.** La imagen flotante del hero usa `outline: 4px solid var(--ivory)` para crear separación visual sin sombra. Este patrón — usar el color de fondo como "sombra" — es el método oficial de elevation del sistema.

## 5. Components

### CTAs / Links
Los CTAs no son botones con relleno. Son texto underline con seguimiento (tracked uppercase) y sin fondo.
- **Forma:** Sin radio, sin padding vertical, borde inferior de 1px (`border-bottom: 1px solid var(--black)`)
- **Tipografía:** Label scale — Montserrat/Inter, 11px, 400, ls 0.18em, uppercase
- **Hover:** `opacity: 0.4` en primary, `opacity: 1` en secondary (que parte de 0.85)
- **Principio:** El CTA nunca compite visualmente con el contenido. Es un susurro, no una llamada.

### Navegación
- **Desktop:** Fixed, fondo transparente hasta scroll. Al hacer scroll: `rgba(247,243,238,0.96)` + `backdrop-filter: blur(10px)` + border-bottom arena 1px.
- **Links:** 11px, Montserrat/Inter, ls 0.16em, uppercase, `opacity: 0.55` en reposo, `opacity: 1` en hover.
- **Logo:** Composición tipográfica en tres familias — "ASH" en Montserrat 900, divider arena 0.5px, "CREATIVE DIRECTION & STYLING" + "MATEU" en Montserrat ultra-light con tracking extremo.
- **Mobile:** Menú full-screen con fondo `#0A0A0A`, links en Bodoni Moda 34px, stagger de entrada con `transition-delay` por ítem.

### Work Grid (Portfolio)
- **Estructura:** Grid de 12 columnas con `gap: 1px`, fondo `rgba(181,168,152,0.18)` que actúa como color de "junta".
- **Items:** Default `span 4`, los ítems 4 y 5 `span 6` para romper uniformidad.
- **Hover:** `transform: scale(1.04)` en 900ms expo-out + intensificación del filtro de imagen.
- **Captions:** Debajo de la imagen, nunca superpuestos. 9px uppercase para la meta, Bodoni Moda para el título.

### Case Study Blocks (Image + Text)
- **Patrón:** Grid 2 columnas con `gap: 3px`. La junta de 3px es el espaciado editorial, no un border.
- **Texto:** Sobre fondo `#FFFFFF`, padding 64px 56px, sin radio, sin sombra.
- **Alternate:** `.case-block--reverse` invierte la dirección con `direction: rtl`.

### Mobile Menu
- **Estilo:** Overlay full-screen `position: fixed; inset: 0; background: #0A0A0A; z-index: 999`
- **Links:** Bodoni Moda, 34px, `rgba(247,243,238,0.85)`, border-bottom arena como separador
- **Motion:** `opacity + translateY` con stagger por item (0.06s a 0.26s)

### "Next Project" Footer
- **Fondo:** `var(--black)` — único momento donde el negro es superficie de página, no overlay.
- **Tipografía:** Label + Bodoni Moda para el título del proyecto siguiente.
- **Hover:** El gap entre el título y la flecha se expande de 20px a 32px.

## 6. Do's and Don'ts

### Do:
- **Do** aplicar el filtro de imagen `brightness(0.88) contrast(1.06) saturate(0.78)` a toda fotografía. Es la firma visual del sistema y unifica la paleta fotográfica.
- **Do** usar Bodoni Moda en italic para el lede de case study — es el único uso de itálica de la familia.
- **Do** mantener las juntas de grid en 1–3px. El espacio entre imágenes es parte del ritmo editorial, no un gap decorativo.
- **Do** usar la paleta en binario: sección clara (ivory) alterna con sección oscura (black). Nunca tres fondos distintos consecutivos.
- **Do** aplicar `cubic-bezier(0.16, 1, 0.3, 1)` como easing universal. Exponencial, sin bounce, sin elastic.
- **Do** respetar el sistema de opacity para jerarquía: 1.0 activo / 0.85 secundario / 0.55 terciario / 0.3 decorativo.
- **Do** usar Montserrat exclusivamente para el logo y los labels de navegación. Es la fuente de "interfaz", no de contenido.

### Don't:
- **Don't** agregar un color de acento saturado. Si el brief pide "un color de marca", la arena ya es ese color. Saturar más viola el principio de elegancia contenida.
- **Don't** usar `border-radius` en ningún elemento. Este sistema es sharp-cornered por principio, no por defecto.
- **Don't** construir layouts con cards uniformes — el grid editorial de 12 columnas con ítems de distinto span es el patrón correcto.
- **Don't** crear portfolios tipo Cargo Collective: grid uniforme, sans-serif limpio sin punto de vista propio. Todo lo que se vea "template" viola el brief.
- **Don't** usar efectos que tapen el trabajo: parallax agresivo, cursores custom, animaciones de entrada que duren más de 0.3s por ítem.
- **Don't** aplicar `box-shadow` a ningún componente. Si algo necesita separarse, usa color de fondo o border 1px arena.
- **Don't** usar Bebas Neue en más de una sección por página. Es el arma editorial de máximo impacto; usarla dos veces la desactiva.
- **Don't** combinar Bodoni Moda con otra serif. El sistema tiene una serif (Bodoni) y una sans (Inter). Agregar Playfair, Cormorant o similar diluye la identidad.
- **Don't** mostrar texto de párrafo con `opacity` menor a 0.5 — viola contraste WCAG AA en fondos ivory.
