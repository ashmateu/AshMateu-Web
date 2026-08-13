# Graph Report - .  (2026-06-22)

## Corpus Check
- Large corpus: 325 files · ~1,219,015 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 230 nodes · 283 edges · 26 communities (16 shown, 10 thin omitted)
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 26 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Portfolio y Celebridades|Portfolio y Celebridades]]
- [[_COMMUNITY_Blog y Notas|Blog y Notas]]
- [[_COMMUNITY_Sitio Web y Config|Sitio Web y Config]]
- [[_COMMUNITY_Postgres Best Practices|Postgres Best Practices]]
- [[_COMMUNITY_Sanity Studio|Sanity Studio]]
- [[_COMMUNITY_Skills y Dependencias|Skills y Dependencias]]
- [[_COMMUNITY_Tipos de Contenido|Tipos de Contenido]]
- [[_COMMUNITY_i18n Multilingüe|i18n Multilingüe]]
- [[_COMMUNITY_Supabase Schema|Supabase Schema]]
- [[_COMMUNITY_Press Sync (Marie Claire)|Press Sync (Marie Claire)]]
- [[_COMMUNITY_Conexiones DB|Conexiones DB]]
- [[_COMMUNITY_Full-Text Search|Full-Text Search]]
- [[_COMMUNITY_gstack Config|gstack Config]]
- [[_COMMUNITY_Migración de Datos|Migración de Datos]]
- [[_COMMUNITY_MercadoPago Preferencia|MercadoPago Preferencia]]
- [[_COMMUNITY_MercadoPago Webhook|MercadoPago Webhook]]
- [[_COMMUNITY_Claude Settings|Claude Settings]]
- [[_COMMUNITY_Vercel Config|Vercel Config]]
- [[_COMMUNITY_MCP Supabase|MCP Supabase]]
- [[_COMMUNITY_Schema Tipos|Schema Tipos]]
- [[_COMMUNITY_Naming DB|Naming DB]]
- [[_COMMUNITY_Particionado DB|Particionado DB]]

## God Nodes (most connected - your core abstractions)
1. `Ash Mateu (Person / Creative Director)` - 33 edges
2. `llms.txt — AI Context File` - 10 edges
3. `Postgres Best Practices Section Definitions` - 9 edges
4. `Supabase Agent Skill v0.1.2` - 8 edges
5. `Home Page (index.html)` - 8 edges
6. `Work Grid (8 Editorial Projects)` - 8 edges
7. `Valentina Ferrer × Miu Miu` - 8 edges
8. `Shared Case Study CSS (css/case.css)` - 8 edges
9. `Chanel Haute Couture × Marie Claire Argentina` - 7 edges
10. `Leonie Hanne × Dolce & Gabbana` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Sanity CMS Integration (sanity.js)` --references--> `Calu Rivero — Chinese New Year (Chinatown)`  [EXTRACTED]
  index.html → projects/calu-chinatown.html
- `Ash Mateu (Person / Creative Director)` --styled--> `Celebrity: Calu Rivero`  [INFERRED]
  index.html → projects/calu-chinatown.html
- `Ash Mateu (Person / Creative Director)` --styled--> `Celebrity: Leonie Hanne`  [INFERRED]
  index.html → projects/leonie-hanne.html
- `Ash Mateu (Person / Creative Director)` --styled--> `Celebrity: Valentina Ferrer`  [INFERRED]
  index.html → projects/valentina-ferrer.html
- `Handoff: ashmateu.com todo operativo` --references--> `ashmateu-web Project Config (CLAUDE.md)`  [INFERRED]
  HANDOFF.md → CLAUDE.md

## Import Cycles
- None detected.

## Communities (26 total, 10 thin omitted)

### Community 0 - "Portfolio y Celebridades"
Cohesion: 0.11
Nodes (37): Celebrity: Calu Rivero, Celebrity: Leonie Hanne, Celebrity: Valentina Ferrer, Ash Mateu (Person / Creative Director), Brand: Chanel, Brand: Dolce & Gabbana, Brand: Gucci, Brand: L'Oréal (+29 more)

### Community 1 - "Blog y Notas"
Cohesion: 0.09
Nodes (30): Blog Collage Card Layout, Blog Page — Notas Editoriales, Blog Post Detail Page, Supabase 'posts' Slug Query (post detail), Supabase 'posts' Table Integration (blog), Auth Modal (Login / Register), Supabase 'orders' + 'products' Join Query, Mi Cuenta Page (User Account Dashboard) (+22 more)

### Community 2 - "Sitio Web y Config"
Cohesion: 0.08
Nodes (28): Admin Panel — El Mercadito de Ash, Auth UI Reference (mercadito), ashmateu-web Project Config (CLAUDE.md), ashmateu-web Design Tokens, ashmateu-web Tech Stack (HTML/CSS/JS sin build), PostgreSQL Index (general concept), Supabase Auth (JWT, sessions, user_metadata), Supabase CLI (+20 more)

### Community 3 - "Postgres Best Practices"
Cohesion: 0.10
Nodes (25): Concurrency and Locking Category (MEDIUM-HIGH), Data Access Patterns Category (MEDIUM), Error-First Structure (Anti-Pattern First), Monitoring and Diagnostics Category (LOW-MEDIUM), Quantified Impact Principle, Query Performance Category (CRITICAL), Row-Level Security (RLS), Schema Design Category (HIGH) (+17 more)

### Community 4 - "Sanity Studio"
Cohesion: 0.11
Nodes (17): allowScripts, esbuild@0.25.6, fsevents@2.3.3, dependencies, react, react-dom, react-is, sanity (+9 more)

### Community 5 - "Skills y Dependencias"
Cohesion: 0.15
Nodes (12): skills, supabase, supabase-postgres-best-practices, computedHash, computedHash, skillPath, source, sourceType (+4 more)

### Community 7 - "i18n Multilingüe"
Cohesion: 0.39
Nodes (6): apply(), getLang(), injectSwitcher(), setLang(), t(), updateSwitcher()

### Community 8 - "Supabase Schema"
Cohesion: 0.43
Nodes (5): orders, orders_updated_at, products, products_updated_at, update_updated_at()

### Community 9 - "Press Sync (Marie Claire)"
Cohesion: 0.67
Nodes (5): buildThumbnailMap(), extractCoverImage(), extractExcerpt(), extractMeta(), handler()

### Community 10 - "Conexiones DB"
Cohesion: 0.47
Nodes (6): Connection Management Category (CRITICAL), PgBouncer Connection Pooler, Configure Idle Connection Timeouts, Set Appropriate Connection Limits, Use Connection Pooling for All Applications, Use Prepared Statements Correctly with Pooling

### Community 11 - "Full-Text Search"
Cohesion: 0.50
Nodes (5): Advanced Features Category (LOW), GIN Index, tsvector Full-Text Search, Use tsvector for Full-Text Search, Index JSONB Columns for Efficient Querying

### Community 12 - "gstack Config"
Cohesion: 0.40
Nodes (4): available, checked_at, install_url, path

## Knowledge Gaps
- **69 isolated node(s):** `enabledMcpjsonServers`, `enableAllProjectMcpServers`, `available`, `path`, `install_url` (+64 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Portfolio Section (#trabajo)` connect `Blog y Notas` to `Portfolio y Celebridades`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `Ash Mateu (Person / Creative Director)` (e.g. with `Celebrity: Calu Rivero` and `Celebrity: Leonie Hanne`) actually correct?**
  _`Ash Mateu (Person / Creative Director)` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `enabledMcpjsonServers`, `enableAllProjectMcpServers`, `available` to the rest of the system?**
  _87 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Portfolio y Celebridades` be split into smaller, more focused modules?**
  _Cohesion score 0.11411411411411411 - nodes in this community are weakly interconnected._
- **Should `Blog y Notas` be split into smaller, more focused modules?**
  _Cohesion score 0.08735632183908046 - nodes in this community are weakly interconnected._
- **Should `Sitio Web y Config` be split into smaller, more focused modules?**
  _Cohesion score 0.07671957671957672 - nodes in this community are weakly interconnected._
- **Should `Postgres Best Practices` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._