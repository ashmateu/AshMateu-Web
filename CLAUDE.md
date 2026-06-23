# ashmateu-web — Claude Code Project Config

Portfolio web estático para Ash Mateu (stylist, directora creativa) en ashmateu.com.

## Stack

- HTML/CSS/JS puro, sin build system, todo inline en `index.html`
- 8 subpáginas editoriales en `projects/`, estilos compartidos en `css/case.css`
- Imágenes en `images/extracted/<editorial>/img-NNN.jpg`
- Servidor local: `python3 -m http.server 8080`

## Tokens de diseño

```css
--black:     #0A0A0A
--ivory:     #F7F3EE
--sand:      #B5A898
--sand-text: #7A6A5A
--serif:     'Bodoni Moda', Georgia, serif
--sans:      'Inter', system-ui, sans-serif
```

Filtro de imagen: `brightness(0.88) contrast(1.06) saturate(0.78)`

## Skills disponibles (gstack)

Para diseño y calidad visual, usar estos skills de gstack:

- `/design-shotgun` — genera múltiples variantes visuales en paralelo para explorar dirección antes de codificar
- `/design-html` — convierte mockups o descripciones en HTML/CSS de producción limpio
- `/design-review` — revisión de diseño antes de commitear
- `/design-consultation` — consulta de dirección visual con referencias
- `/qa` — QA visual con Playwright, valida que el sitio se ve bien en distintas resoluciones
- `/review` — revisión de código antes de hacer push
- `/browse` — navegar el sitio localmente para verificar cambios

Para UI annotation (identificar elementos por nombre al hacer cambios de diseño):
- Iniciar: `npx @mcpware/ui-annotator` (proxy en localhost:7077)
- Abrir: `http://localhost:7077/localhost:8080`
- Hover sobre cualquier elemento para ver su selector CSS exacto

## Agentes disponibles (agency-agents)

Agentes especializados instalados en `~/.claude/agents/`:
- Diseño: `ui-designer`, `visual-designer`, `brand-designer`, `creative-director`
- Marketing: `content-strategist`, `copywriter`, `seo-specialist`
- Ingeniería: `frontend-developer`, `fullstack-developer`
- Producto: `product-manager`, `ux-researcher`

Activar con: "Activa el agente `ui-designer` y revisa el hero de la página principal"

## Pendientes críticos

1. Formspree: reemplazar `FORMSPREE_ID` en `index.html` (email: ash.mateu@gmail.com)
2. Deploy: arrastrar carpeta a Netlify o FTP a GoDaddy `public_html/`

## Referencias de diseño

- Inspiración: artandcommerce.com (carrusel editorial)
- awesome-claude-code-workflows: https://github.com/ithiria894/awesome-claude-code-workflows
