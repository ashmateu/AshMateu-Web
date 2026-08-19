# Graph Report - ashmateu-web  (2026-08-19)

## Corpus Check
- Large corpus: 1765 files · ~30,510,186 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 332 nodes · 418 edges · 33 communities (26 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Home & Core Pages
- Blog & Newsletter Routes
- UI Libraries & Animation Dependencies
- TypeScript & Next.js Type Environment
- Tailwind CSS & PostCSS Tooling
- Sanity CMS Client & Config
- Project Details & Dynamic Slugs
- Root Layout, Typography & SEO JSON-LD
- Sanity Studio Schemas
- Legacy i18n & Translation Runtime
- AI Concierge & Qwen Backend API
- Visual Diary & 3D Coverflow Carousel
- Subsystem 12
- Subsystem 13
- Subsystem 14
- Subsystem 15
- Subsystem 16
- Subsystem 17
- Subsystem 18
- Subsystem 19
- Subsystem 21
- Subsystem 22
- Subsystem 23
- Subsystem 24
- Subsystem 25
- Subsystem 27

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `GsapReveal()` - 12 edges
3. `ContactForm()` - 10 edges
4. `getPressArticles()` - 8 edges
5. `include` - 6 edges
6. `apply()` - 5 edges
7. `init()` - 5 edges
8. `handler()` - 5 edges
9. `scripts` - 5 edges
10. `Project` - 5 edges

## Surprising Connections (you probably didn't know these)
- `NewsletterPage()` --calls--> `getPressArticles()`  [EXTRACTED]
  src/app/newsletter/page.tsx → src/lib/data/press.ts
- `PrensaPage()` --calls--> `getPressArticles()`  [EXTRACTED]
  src/app/prensa/page.backup.tsx → src/lib/data/press.ts
- `PrensaPage()` --calls--> `getPressArticles()`  [EXTRACTED]
  src/app/prensa/page.tsx → src/lib/data/press.ts
- `ProjectGalleryInteractiveProps` --references--> `Project`  [EXTRACTED]
  src/components/portfolio/ProjectGalleryInteractive.tsx → src/lib/data/projects.ts
- `ProjectNavigationFooterProps` --references--> `Project`  [EXTRACTED]
  src/components/portfolio/ProjectNavigationFooter.tsx → src/lib/data/projects.ts

## Import Cycles
- None detected.

## Communities (33 total, 7 thin omitted)

### Community 0 - "Home & Core Pages"
Cohesion: 0.09
Nodes (24): metadata, metadata, GsapReveal(), GsapRevealProps, BrandItem, brandLogos, ClientsStrip(), EditorialGaleria() (+16 more)

### Community 1 - "Blog & Newsletter Routes"
Cohesion: 0.09
Nodes (23): articles, metadata, metadata, NewsletterPage(), covers, metadata, PrensaPage(), characterCoverGroups (+15 more)

### Community 2 - "UI Libraries & Animation Dependencies"
Cohesion: 0.06
Nodes (33): clsx, framer-motion, gsap, lucide-react, next, nuqs, openai, dependencies (+25 more)

### Community 3 - "TypeScript & Next.js Type Environment"
Cohesion: 0.07
Nodes (27): dom, dom.iterable, esnext, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts (+19 more)

### Community 4 - "Tailwind CSS & PostCSS Tooling"
Cohesion: 0.08
Nodes (23): devDependencies, postcss, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom, typescript (+15 more)

### Community 5 - "Sanity CMS Client & Config"
Cohesion: 0.08
Nodes (23): react-is, sanity, @sanity/vision, allowScripts, esbuild@0.25.6, fsevents@2.3.3, dependencies, react (+15 more)

### Community 6 - "Project Details & Dynamic Slugs"
Cohesion: 0.16
Nodes (10): ProjectPageProps, ProjectGalleryInteractive(), ProjectGalleryInteractiveProps, ProjectNavigationFooter(), ProjectNavigationFooterProps, ImageLightboxModal(), ImageLightboxModalProps, LightboxImage (+2 more)

### Community 7 - "Root Layout, Typography & SEO JSON-LD"
Cohesion: 0.18
Nodes (9): bodoni, jsonLd, metadata, montserrat, ConciergeDrawer(), Message, STARTER_PROMPTS, Footer() (+1 more)

### Community 9 - "Legacy i18n & Translation Runtime"
Cohesion: 0.42
Nodes (9): apply(), cacheEs(), getLang(), init(), injectStyles(), injectSwitcher(), setLang(), t() (+1 more)

### Community 10 - "AI Concierge & Qwen Backend API"
Cohesion: 0.31
Nodes (7): dynamic, maxDuration, BACKUP_QWEN_MODEL, ChatMessage, CONCIERGE_SYSTEM_PROMPT, PRIMARY_QWEN_MODEL, qwenAI

### Community 11 - "Visual Diary & 3D Coverflow Carousel"
Cohesion: 0.33
Nodes (6): InstagramStrip(), visualDiarySlides, CoverflowCarousel(), CoverflowCarouselProps, CoverflowSlide, cn()

### Community 12 - "Subsystem 12"
Cohesion: 0.25
Nodes (7): calculateGap(), CircularTestimonials(), getImageStyle(), CircularTestimonialsProps, Colors, FontSizes, Testimonial

### Community 13 - "Subsystem 13"
Cohesion: 0.67
Nodes (5): buildThumbnailMap(), extractCoverImage(), extractExcerpt(), extractMeta(), handler()

### Community 14 - "Subsystem 14"
Cohesion: 0.33
Nodes (5): BACKUP_NVIDIA_MODEL, ChatMessage, CONCIERGE_SYSTEM_PROMPT, nvidiaAI, PRIMARY_NVIDIA_MODEL

### Community 16 - "Subsystem 16"
Cohesion: 0.50
Nodes (4): DEFAULT_CONFIG, getDomPath(), SlotConfig, UniversalImageCalibrator()

### Community 17 - "Subsystem 17"
Cohesion: 0.40
Nodes (3): DEFAULT_SLIDES, LuminaInteractiveListProps, LuminaSlide

### Community 18 - "Subsystem 18"
Cohesion: 0.50
Nodes (4): Project Guidelines & Dev Workflows, Warm Luxury Design System, Handoff Context & Technical State, Product Architecture & Roadmap

### Community 19 - "Subsystem 19"
Cohesion: 1.00
Nodes (3): getLang(), render(), tr()

### Community 21 - "Subsystem 21"
Cohesion: 0.67
Nodes (3): config, handler(), stripHtml()

## Knowledge Gaps
- **124 isolated node(s):** `config`, `nextConfig`, `name`, `version`, `private` (+119 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `UI Libraries & Animation Dependencies` to `Tailwind CSS & PostCSS Tooling`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Why does `ContactForm()` connect `Blog & Newsletter Routes` to `Home & Core Pages`, `Project Details & Dynamic Slugs`, `Subsystem 15`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **What connects `config`, `nextConfig`, `name` to the rest of the system?**
  _124 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Home & Core Pages` be split into smaller, more focused modules?**
  _Cohesion score 0.08636977058029689 - nodes in this community are weakly interconnected._
- **Should `Blog & Newsletter Routes` be split into smaller, more focused modules?**
  _Cohesion score 0.08858858858858859 - nodes in this community are weakly interconnected._
- **Should `UI Libraries & Animation Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Should `TypeScript & Next.js Type Environment` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._