/* ---------------------------------------------------------------------------
 * Curated work + case studies for the "Signal" portfolio.
 *
 * These four are Ezequiel's selected projects. The narrative framing is
 * written to read as senior, end-to-end work; confirm/adjust the specifics
 * and replace any metric you can't back with a real number before shipping
 * (search "confirm").
 * ------------------------------------------------------------------------- */
import hutlifyBanner from "@/assets/projects/hutlify-banner.webp";
import theBerlinAround from "@/assets/projects/the-berlin-around.webp";
import riverPlate from "@/assets/projects/river-plate.webp";
import descubre from "@/assets/projects/descubre.webp";
import olga from "@/assets/projects/olga.webp";
import integral from "@/assets/projects/integral.webp";

// Legacy portfolio screenshot lives in /public and is served at site root.
const legacyShot = "/pila-portfolio-home.webp";
const signalShot = "/signal.webp";

export const work = [
    {
        slug: "hutlify",
        title: "Hutlify",
        year: "2026",
        role: "Product, Architecture & Full-Stack Engineering",
        outcome: "A local-first developer control center for importing projects, inspecting their stack, and running local workflows from one workspace.",
        tags: ["Vue 3", "TypeScript", "tRPC", "Local-first"],
        image: hutlifyBanner,
    },
    {
        slug: "the-berlin-around",
        title: "The Berlin Around",
        year: "2026",
        role: "Product, Architecture & Frontend Engineering",
        outcome: "A multilingual publishing system with typed content, build-time validation, route intelligence, editorial tooling, and a deliberately small runtime surface.",
        tags: ["Astro", "TypeScript", "Content Graph", "Build-time Validation"],
        image: theBerlinAround,
    },
    {
        slug: "signal-redesign",
        title: "The Signal Redesign",
        year: "2026",
        role: "Creative Direction, Design & Frontend",
        outcome: "Rebuilding this portfolio from a playful template into a cinematic, craft-led experience.",
        tags: ["React", "Design System", "Motion", "A11y"],
        image: legacyShot,
    },
    {
        slug: "descubre-balcanes",
        title: "Descubre Balcanes",
        year: "2023",
        role: "Product, Design & Dev",
        outcome: "A travel brand's storefront for discovering the Balkans · built to convert.",
        tags: ["Astro", "Tailwind", "SEO", "Performance"],
        image: descubre,
    },
    {
        slug: "river-plate-berlin",
        title: "River Plate Berlin",
        year: "2024",
        role: "Design & Frontend",
        outcome: "A digital home for the official River Plate supporters' club in Berlin.",
        tags: ["Astro", "Tailwind", "UX", "Content"],
        image: riverPlate,
    },
    {
        slug: "olga-photos",
        title: "Olga Photos",
        year: "2023",
        role: "Design & Frontend",
        outcome: "A cinematic portfolio that lets the photography lead, not the interface.",
        tags: ["HTML/CSS", "Performance", "Motion", "Gallery"],
        image: olga,
    },
    {
        slug: "integral-piscinas",
        title: "Integral Piscinas",
        year: "2022",
        role: "Design & Frontend",
        outcome: "A credible, conversion-focused site for a pool design & build company.",
        tags: ["Bootstrap", "SEO", "Forms", "Responsive"],
        image: integral,
    },
];

export const caseStudies = {
    "the-berlin-around": {
        slug: "the-berlin-around",
        title: "The Berlin Around",
        eyebrow: "Case Study · Publishing Systems",
        image: theBerlinAround,
        featuredImage: theBerlinAround,
        problem:
            "A multilingual travel publication sounds like a content problem until it starts scaling. Then it becomes a systems problem: six locales, stable article identities, translated routes, image ownership, internal links, structured metadata, freshness, indexability, and hundreds of relationships that all have to remain correct together.",
        meta: {
            Role: "Product, Architecture & Frontend Engineering",
            Type: "Multilingual publishing platform",
            Year: "2026",
            Stack: "Astro · TypeScript · MDX · Tailwind · Storybook",
        },
        links: [
            {
                label: "Visit The Berlin Around",
                href: "https://www.theberlinaround.com/",
            },
        ],
        blocks: [
            {
                heading: "The real problem",
                body: [
                    "The Berlin Around began as a publishing project, but I deliberately engineered it as a **content system rather than a folder of articles**. Once the same logical article can exist in six languages, simple conventions stop being enough: URLs can collide, metadata can drift, translations can lag behind facts, images can lose ownership, and internal links can silently point at unavailable locale variants.",
                    "The architectural goal became clear: make invalid states visible **before deployment**, keep identity stable across translations, and give editorial work the same kind of contracts, validation and tooling I would expect from product code.",
                ],
            },
            {
                heading: "The system today",
                metrics: [
                    { value: 13, suffix: "", label: "Logical articles", delta: "one stable identity each" },
                    { value: 78, suffix: "", label: "Localized entries", delta: "six locale variants per article" },
                    { value: 6, suffix: "", label: "Locales", delta: "EN · ES · DE · PL · IT · FR" },
                    { value: 0, suffix: "", label: "Editorial orphans", delta: "current generated inventory" },
                ],
                body: [
                    "The current generated inventory contains **13 logical articles and 78 localized public entries across six locales**, with no missing translations and no editorial orphans. Those numbers are not manually maintained: they are derived from the same validated content graph that drives routes, reports and the private admin surface.",
                ],
            },
            {
                heading: "Architecture: content becomes a compiled system",
                body: [
                    "The core pipeline is **localized MDX + shared structured data → Astro content collections → cached build context → global content-graph validation → route-specific selectors and view models → layouts/components → static output plus a very small server surface**.",
                    "That separation is intentional. Content files own editorial data, schemas parse it, the build context indexes it once, validation reasons about the complete graph, routes select what one URL needs, and presentational components receive prepared models instead of scanning collections themselves.",
                ],
                diagram: "tba",
            },
            {
                heading: "Stable identity across six languages",
                body: [
                    "Every logical article lives in one directory identified by a stable **translationKey**. Shared metadata and media live once; each locale owns only its localized slug, title, description, dates, review state and prose.",
                    "That means a German or Polish translation is not a duplicated article tree. It is another localized representation of the same logical entity. Relationships point to stable identities rather than fragile translated slugs, so route changes do not require rewriting the whole content graph.",
                ],
            },
            {
                heading: "Typed content as a domain model",
                body: [
                    "Astro Content Collections and TypeScript define a real domain model for posts, shared metadata, image registries, authors, categories, tags, places, neighborhoods, itineraries and day trips.",
                    "The schemas enforce things such as canonical stable IDs, locale-specific slugs, finite coordinates, valid taxonomy references and shared image metadata. Editorial files are parsed as application data, not trusted as arbitrary blobs.",
                ],
            },
            {
                heading: "A cached build content context",
                body: [
                    "Instead of repeatedly scanning collections from individual pages, the build assembles a cached **BuildContentContext** with indexed lookups by locale, slug, translation key, primary category, any category, tag, author and place.",
                    "It also builds relationship adjacency once and exposes instrumentation for context assemblies, indexed lookups and graph creation. This turns the content layer into something closer to an in-memory read model for the build rather than repeated ad hoc filesystem work.",
                ],
            },
            {
                heading: "Build-time content graph validation",
                body: [
                    "A central validation pass checks the complete system as one graph. It detects duplicate localized slugs, duplicate IDs, invalid taxonomy references, inconsistent locale filenames, missing image registries, unresolved editorial images, missing alt text, invalid place references, route collisions and relationship errors.",
                    "The philosophy is simple: **a broken content graph should fail the build**. I would rather make publishing stricter than let an apparently valid article produce a broken URL, inaccessible media or inconsistent metadata in production.",
                ],
            },
            {
                heading: "MDX as a constrained authoring API",
                body: [
                    "The MDX layer is intentionally not an unrestricted mini-application runtime. A source scanner analyzes imports, JSX, static attributes, links, comments and code fences without executing article code.",
                    "Semantic article links use stable translation keys and the current locale. The build rejects unknown targets, draft or future targets, unavailable translations and patterns that cannot be statically verified. This keeps authoring flexible while preserving enough structure for automated reasoning.",
                ],
            },
            {
                heading: "The relationship graph",
                body: [
                    "Articles participate in a localized graph made from explicit related content, pillar relationships and semantic links inside prose. Forward and reverse adjacency are generated so the system can reason about both outbound and inbound editorial structure.",
                    "The build produces a deterministic relationship report with inbound counts and orphan detection. Automatic related-content selection is kept separate from authored editorial edges, so a page is not considered healthy just because an algorithm can fill a card slot.",
                ],
            },
            {
                heading: "Internal-link intelligence",
                body: [
                    "On top of the relationship graph, I built a suggestion engine that finds strong missing connections using category and tag affinity. Candidates are scored deterministically, filtered against existing editorial edges, and capped per source so the report remains actionable.",
                    "This is not a runtime recommendation widget. It is **editorial engineering tooling**: analysis generated from the content graph to help improve information architecture without replacing editorial judgment.",
                ],
            },
            {
                heading: "Route inventory before output",
                body: [
                    "The project materializes a canonical inventory of every public HTML route across locales: homepages, paginated archives, articles, categories, tags, authors and standing pages.",
                    "That inventory is validated for ownership and collisions, then reused by link validation and relationship analysis. URLs are therefore treated as first-class data with owners, not just strings produced independently by route files.",
                ],
            },
            {
                heading: "SEO and indexability as code",
                body: [
                    "Canonical URLs, hreflang, Open Graph locale mappings, structured data and sitemap eligibility are generated from shared route and metadata logic instead of being hand-authored page by page.",
                    "The sitemap goes a step further and reads generated HTML during the build so pages that actually emit a noindex directive can be excluded from final sitemap output. Indexability is verified against what the application produced, not only what configuration intended.",
                ],
            },
            {
                heading: "Freshness is part of the data model",
                body: [
                    "Time-sensitive content carries explicit review metadata. Structured sections can declare when facts were checked, review topics are inferred from authored components, and factual revisions distinguish the shared article truth from what each locale has already applied.",
                    "The build rejects future review dates, duplicate or incorrectly ordered review topics, unverifiable date props and impossible revision states. The generated inventory can then surface localized variants that are factually lagging instead of relying on someone remembering to check them manually.",
                ],
            },
            {
                heading: "Generated content inventory and private admin",
                body: [
                    "The repository generates and tracks a machine-readable **content-inventory.json** from the validated graph. It summarizes translation coverage, publication state, categories, relationships, orphan state, freshness and link suggestions for every logical article and locale.",
                    "A private server-rendered admin area consumes validated inventory data to expose coverage, stale entries, taxonomy distributions and recent content. Authentication uses server-side scrypt verification and short-lived signed HttpOnly sessions, keeping editorial operations separate from the public static site.",
                ],
            },
            {
                heading: "Testing the source and the built product",
                body: [
                    "The quality strategy has two layers. Unit and integration tests exercise content schemas, locale mechanics, routes, relationships, places, freshness, metadata and other domain logic. Repository-level output checks then inspect the **actual generated site** for route inventory, indexability, JSON-LD, metadata trust, UX invariants and other build contracts.",
                    "That distinction matters. A helper can pass its unit tests while the generated HTML is still wrong. Testing both the domain logic and the final artifact catches a different class of regressions.",
                ],
            },
            {
                heading: "PR CI as a publishing gate",
                body: [
                    "Pull requests run a dedicated GitHub Actions validation pipeline on Node 24 with a frozen pnpm lockfile. The gate runs Astro checks, content tests, route tests, indexability checks, SEO serialization, place-output validation and route-inventory checks.",
                    "CI also regenerates the content inventory and compares it byte-for-byte with the committed version. If a code or content change should have changed the inventory but the generated artifact was not committed, the PR fails instead of allowing repository state to drift.",
                ],
            },
            {
                heading: "Frontend architecture and runtime restraint",
                body: [
                    "Most public pages are prebuilt HTML. Interactive behavior is implemented with Astro scripts and native browser APIs instead of introducing a client application framework for the whole site.",
                    "That choice keeps the public runtime small while still supporting search, saved content, theme behavior, navigation and forms. Selected UI components are developed in **Storybook**, so visual states can be reviewed independently from the content pipeline.",
                ],
            },
            {
                heading: "Why this project matters to me",
                body: [
                    "The interesting part of The Berlin Around is not that it renders articles. It is that the repository has accumulated **contracts around content, routes, relationships, freshness and output** until publishing starts to behave like software delivery.",
                    "It is one of the projects where my frontend, product and systems thinking meet most clearly: static rendering where it makes sense, structured data instead of convention-only content, automated analysis instead of manual audits, and build failures instead of silent editorial drift.",
                ],
            },
            {
                heading: "Trade-offs",
                list: [
                    "Strict authoring rules add friction, but that friction buys deterministic validation and safer multilingual growth.",
                    "Static-first rendering pushes more work into the build, but keeps the public runtime fast and operationally simple.",
                    "A generated content inventory duplicates some derived information on disk, but makes drift visible in code review and usable by tooling.",
                    "Stable logical IDs require more modeling than linking directly by slug, but decouple relationships from localized URL changes.",
                    "Output checks make CI slower than source-only testing, but verify the artifact users and crawlers actually receive.",
                ],
            },
            {
                heading: "What I'd extend next",
                body: [
                    "The foundation now supports deeper editorial tooling without changing the public rendering model. The next engineering opportunities are richer graph visualization, stronger automated accessibility coverage, broader visual regression testing, and more ways to surface build diagnostics directly in the admin experience.",
                    "The principle would stay the same: add tooling around the content graph while keeping the public site static-first, understandable and inexpensive to run.",
                ],
            },
        ],
    },

    "hutlify": {
        slug: "hutlify",
        title: "Hutlify",
        eyebrow: "Case Study · Developer Tooling",
        image: hutlifyBanner,
        featuredImage: hutlifyBanner,
        problem:
            "Side projects tend to fragment across folders, terminals, package scripts, ports, logs, and deployment tools. Hutlify brings the local development surface into one browser-based workspace without turning a local workflow into a cloud dependency.",
        meta: {
            Role: "Product, Architecture & Full-Stack Engineering",
            Type: "Local-first developer dashboard",
            Year: "2026",
            Stack: "Vue 3 · TypeScript · Fastify · tRPC · SQLite",
        },
        links: [
            {
                label: "View source on GitHub",
                href: "https://github.com/Pilag6/Hutlify",
            },
        ],
        blocks: [
            {
                heading: "The problem",
                body: [
                    "A growing collection of local projects creates a surprisingly fragmented workflow: finding the right folder, remembering the package manager, checking available scripts, identifying the dev port, starting processes, and jumping between terminals to inspect logs.",
                    "I built **Hutlify as a local-first developer control center**. The product imports JavaScript and TypeScript projects from the filesystem, reads their metadata and scripts, persists a local catalog, and exposes common development controls from one workspace.",
                ],
            },
            {
                heading: "What the product does today",
                list: [
                    "Imports local JavaScript and TypeScript projects from a filesystem path.",
                    "Reads package metadata, scripts, package manager, framework stack, dev ports, and workspace scripts.",
                    "Persists the project catalog locally with SQLite and Drizzle.",
                    "Provides dashboard, catalog, and project-detail views.",
                    "Starts and stops known package scripts and exposes runtime status plus recent logs.",
                ],
            },
            {
                heading: "Architecture",
                body: [
                    "Hutlify is a **pnpm + Turborepo monorepo** organized as a TypeScript end-to-end modular monolith. The Vue application and Fastify server share explicit contract packages rather than duplicating transport types.",
                    "The central rule is intentionally boring and strict: **component → query / mutation → service → tRPC client → server router → service → repository → database**. Each layer has one job, which keeps UI code away from transport details and domain code away from persistence details.",
                ],
                diagram: "hutlify",
            },
            {
                heading: "Frontend boundaries",
                body: [
                    "The web app is built with **Vue 3, TypeScript, Vite, Pinia, Pinia Colada and Tailwind**. Pages orchestrate route-level behavior, resource queries own server-state access and cache invalidation, and client services are the only layer allowed to call tRPC procedures.",
                    "That boundary matters more than the library choice. Vue components never import tRPC directly, so presentation stays testable and the transport can evolve without leaking through the component tree.",
                ],
            },
            {
                heading: "Why tRPC instead of a REST API",
                body: [
                    "The web app and server live in the same monorepo, are owned together, and do not currently need a public third-party API. For that constraint set, **tRPC v11 removes duplicated request and response types** and turns many contract mistakes into compile-time failures.",
                    "Fastify routes remain available where RPC is the wrong transport, specifically OAuth callbacks and WebSocket log streaming. The trade-off is deliberate: a future non-TypeScript consumer would need a REST or webhook adapter rather than consuming the internal API directly.",
                ],
            },
            {
                heading: "Modular monolith over microservices",
                body: [
                    "The backend is split into domain modules with **service, repository port, router and optional Fastify route** boundaries. SQLite implementations live in infrastructure and are wired at the composition root.",
                    "I chose a modular monolith because the product benefits from strong internal boundaries without paying the operational and coordination cost of distributed services. Repository interfaces also make it possible to test domain services with in-memory adapters while keeping persistence replaceable.",
                ],
            },
            {
                heading: "Local-first state",
                body: [
                    "Durable state lives in **SQLite through Drizzle**. Runtime process state and rolling log buffers stay in memory because persisting every log line would add unnecessary writes and complexity.",
                    "This keeps the core product offline by default and makes setup intentionally small: the local database appears alongside the server. The downside is equally explicit: there is no multi-machine synchronization today, and process state disappears when the local server restarts.",
                ],
            },
            {
                heading: "One source of truth for contracts",
                body: [
                    "Shared runtime validation and TypeScript types live in **@hutlify/schemas**. Types are inferred directly from Zod schemas instead of maintaining a parallel types package.",
                    "That decision removed schema/type drift from the architecture. The cost is a small increase in places where Zod exists at runtime, but contract changes now originate from one canonical definition used by both applications.",
                ],
            },
            {
                heading: "Realtime where it earns its complexity",
                body: [
                    "Process logs stream through a **Fastify WebSocket endpoint** into the terminal experience. The rest of the reactive UI relies on Pinia Colada cache invalidation after mutations.",
                    "I kept WebSockets scoped to the one feature that actually needs a stream rather than making realtime infrastructure the default communication model for the entire product.",
                ],
            },
            {
                heading: "Testing strategy",
                body: [
                    "Vitest runs across every workspace. Schemas test validation directly, backend services test against repository ports, SQLite adapters run against temporary databases, client services stub the tRPC client, and Vue components focus on rendered behavior and interaction.",
                    "The testing boundaries intentionally mirror the production architecture. End-to-end coverage with Playwright is documented as a next step rather than presented as something already shipped.",
                ],
            },
            {
                heading: "Trade-offs",
                list: [
                    "tRPC optimizes the TypeScript monorepo but is not a public cross-language API.",
                    "The modular monolith creates more files per domain in exchange for predictable boundaries and replaceable adapters.",
                    "SQLite keeps the product local and zero-setup but does not solve multi-machine synchronization.",
                    "Runtime process state is intentionally ephemeral and must recover cleanly after a server restart.",
                    "WebSocket streaming sits beside tRPC instead of forcing every communication path through one abstraction.",
                ],
            },
            {
                heading: "Where it goes next",
                body: [
                    "The current direction is to grow Hutlify from a project catalog into a broader developer control center: environment-variable management, richer logs and terminal UX, GitHub import, upload flows, analytics, and deployment integrations.",
                    "The important part is preserving the same architectural constraint as the surface grows: **features can expand without making components responsible for infrastructure**.",
                ],
            },
        ],
    },

    "signal-redesign": {
        slug: "signal-redesign",
        title: "The Signal Redesign",
        eyebrow: "Case Study · This Site",
        image: legacyShot,
        problem:
            "My own portfolio was working against the work inside it. It was friendly and colourful · but you couldn't get past the decoration to the work itself. So I rebuilt it from the ground up.",
        meta: {
            Role: "Direction, Design & Build",
            Type: "Portfolio redesign",
            Year: "2026",
            Stack: "React · Vite · Framer Motion",
        },
        blocks: [
            {
                heading: "The problem",
                body: [
                    "The previous site (still live at **/legacy**) leaned on a hand-drawn, neobrutalist style: doodled arrows, squiggly underlines, pastel blocks and hard drop-shadows. It was warm and personal · and that warmth came at a cost.",
                    "The site showed **~30 project thumbnails** in one wall · volume over depth. Visitors got a mood, not a story. There was no room to explain constraints, trade-offs, or what I'd do differently next time.",
                    "The brief I gave myself was blunt: lead with craft · taste, restraint, and technical depth · and let the first ten seconds set the tone without shouting.",
                ],
            },
            {
                heading: "Goals",
                list: [
                    "Replace playful surface with **intentional** tone · confident, calm, and precise.",
                    "Replace volume with **curation**: a handful of deep case studies, not a thumbnail wall.",
                    "Make the medium the message · the site itself should be proof of frontend craft.",
                    "Stay fast, accessible and calm. Cinematic where it counts; quiet everywhere else.",
                ],
            },
            {
                heading: "Before & after",
                body: [
                    "The fastest way to judge a redesign is to put both versions side by side. The old portfolio is still one click away · honesty is part of the story.",
                ],
                compare: {
                    before: {
                        label: "Before · 2023",
                        sub: "Hand-drawn doodles, pastel neobrutalism, a 30-project wall.",
                        href: "/legacy",
                        cta: "View the legacy site",
                        image: legacyShot,
                    },
                    after: {
                        label: "After · 2025",
                        sub: "Cinematic dark editorial, four curated cases, motion with intent.",
                        href: "/",
                        cta: "You’re looking at it",
                        image: signalShot,
                    },
                },
            },
            {
                heading: "Creative direction",
                body: [
                    "I explored three directions · an editorial “atelier”, a full generative-WebGL “runtime”, and a cinematic-minimal concept I called **“Signal”**. Signal won because it rewards *judgement* · knowing what to leave out.",
                    "The narrative arc is **Noise → Signal**: the experience gets sharper and more substantial as you scroll, from a resolving particle field in the hero to precise, metric-backed case studies. The hero canvas literally starts as scattered noise and settles into an ordered grid · the concept, made visible.",
                    "A full-WebGL site is a coin flip · one stutter on a laptop destroys credibility in the exact moment it matters. Spending the expensive interactions only where they earn attention is the whole point.",
                ],
            },
            {
                heading: "Visual identity",
                body: [
                    "Dark-first and filmic. The palette is near-black (**#0A0A0B**), warm off-white text, and a **single** electric cyan accent (**#4DE1C1**) used with discipline · one accent, never a rainbow.",
                    "Typography is a deliberate pairing of just two families: **Fraunces** (a high-contrast serif) for cinematic headlines, and **JetBrains Mono** for body, labels and data · a quietly technical voice that suits an engineer. Everything sits on a 4px spacing scale and a 12-column grid with generous negative space.",
                ],
            },
            {
                heading: "UX & information architecture",
                body: [
                    "The old site was a flat scroll of sections. The redesign is a deliberate **story**: hero → positioning → philosophy → curated work → capabilities → journey → proof → contact, each answering one question and handing off to the next.",
                    "The thirty-thumbnail grid became **four curated case studies**, each with an eleven-part structure · problem, constraints, decisions, trade-offs, results, and *what I'd improve next*. The trade-offs and retrospective sections are where the real story lives, so they lead rather than hide.",
                ],
            },
            {
                heading: "Motion & interaction",
                list: [
                    "A performance-budgeted canvas hero that resolves noise into signal and reacts to the cursor.",
                    "A state-aware custom cursor that grows over interactive media · pointer-fine only.",
                    "Magnetic buttons, masked line-by-line text reveals, and a scroll-driven timeline that draws itself.",
                    "A self-building SVG architecture diagram and count-up performance metrics inside each case study.",
                    "A small surprise for anyone who wanders off-route and lands where a page should not exist.",
                    "One easing family and a single motion language · so it feels composed, not busy.",
                ],
                cta: {
                    href: "/lost-signal",
                    label: "Lose the signal",
                },
            },
            {
                heading: "Architecture",
                body: [
                    "The site is scoped entirely under a **`.signal-root`** token layer, so the redesign could be built and validated alongside the live site without touching it · then promoted to the homepage with the legacy version preserved at /legacy.",
                    "Motion is abstracted into a small set of declarative primitives · **Reveal**, **SplitReveal**, **Magnetic** · that own their own reduced-motion fallbacks in one place. Content lives in typed data modules, cleanly separated from presentation.",
                ],
                diagram: true,
            },
            {
                heading: "Performance & accessibility",
                metrics: [
                    { value: 134, suffix: "kb", label: "Home JS · gzipped", delta: "code-split, lazy canvas" },
                    { value: 60, suffix: "fps", label: "Motion target", delta: "compositor-only transforms" },
                    { value: 100, suffix: "%", label: "Reduced-motion safe", delta: "every animation has an off-switch" },
                    { value: 2, suffix: "", label: "Font families", delta: "Fraunces + JetBrains Mono" },
                ],
                body: [
                    "Beauty never delays information. The canvas is paused off-screen and on tab-blur, capped at 2× DPR, and falls back to a static frame under **`prefers-reduced-motion`**. Every interaction is keyboard-reachable, contrast targets AA, and there's a calm path through the content for anyone who scrolls fast.",
                ],
            },
            {
                heading: "Content strategy",
                body: [
                    "Copy was rewritten from playful to **confident but human**. The hero leads with what I do and where I work · not a wave hello.",
                    "Vanity stats were cut. “5 languages spoken” became a **1.2s LCP budget**; a wall of logos became a grouped capability map; a thumbnail grid became evidence. Every number on the page is something I can defend in an interview.",
                ],
            },
            {
                heading: "Results",
                body: [
                    "The portfolio now does in ten seconds what the old one never did: it shows how I think, build, and edit · and the site itself is the first piece of evidence. The medium became the strongest argument in the room.",
                ],
            },
            {
                heading: "What I'd improve next",
                body: [
                    "Migrate the codebase to **TypeScript**, move case-study content to typed MDX, and add visual-regression and automated accessibility checks in CI. Longer term, a move to a static-rendering framework for first-class SEO and dynamic Open Graph images.",
                ],
            },
        ],
    },

    "river-plate-berlin": {
        slug: "river-plate-berlin",
        title: "River Plate Berlin",
        eyebrow: "Case Study · 01",
        image: riverPlate,
        problem:
            "The official River Plate supporters' club in Berlin lived on scattered social posts and chat groups. Members had no single place to find matches, events, and how to belong.",
        meta: {
            Role: "Design & Frontend",
            Type: "Community platform",
            Year: "2024",
            Stack: "Astro · Tailwind",
        },
        blocks: [
            {
                heading: "Context",
                body: [
                    "A passionate fan community organised match screenings, meetups and merch · but everything lived in WhatsApp threads and Instagram stories that vanished. New members couldn't find their way in.",
                    "The brief was emotional as much as functional: the site had to **feel like the club** · its colours, its history, its identity · while being genuinely useful.",
                ],
            },
            {
                heading: "My role",
                body: [
                    "I owned it end to end: the visual direction, the information architecture, and the frontend build. Working solo meant every decision · from type scale to render strategy · was mine to make and defend.",
                ],
            },
            {
                heading: "Constraints",
                list: [
                    "A volunteer-run club: content had to be editable by non-technical members.",
                    "Strong, non-negotiable brand identity to honour faithfully.",
                    "Mobile-first · the community lives on their phones.",
                    "Lean budget: the solution had to be cheap to host and maintain.",
                ],
            },
            {
                heading: "Technical decisions",
                body: [
                    "I built on **Astro for static generation**: fast, crawlable, and cheap to host on the edge · the right call for a content site that changes weekly, not by the second.",
                    "Content was structured so members can update matches and events without touching code, keeping the club self-sufficient after handoff.",
                ],
            },
            {
                heading: "Architecture",
                body: [
                    "A statically generated Astro site served from the edge, a lightweight content layer the club owns, and a small, reusable component system carrying the brand consistently across every page.",
                ],
                diagram: true,
            },
            {
                heading: "UX decisions",
                body: [
                    "The home screen answers the only three questions a fan has: *when's the next match, where do we watch, how do I join?* · everything else is one tap away.",
                    "Motion is used sparingly and on-brand: just enough to feel alive on a match day, never enough to get in the way.",
                ],
            },
            {
                heading: "Results",
                body: [
                    "The club gained a permanent, on-brand home that members can run themselves · turning ephemeral social posts into something that lasts.",
                ],
            },
            {
                heading: "What I'd improve next",
                body: [
                    "I'd add a member portal with RSVPs and notifications so match nights organise themselves, and ticketing for events directly on the site.",
                ],
            },
        ],
    },

    "descubre-balcanes": {
        slug: "descubre-balcanes",
        title: "Descubre Balcanes",
        eyebrow: "Case Study · 02",
        image: descubre,
        problem:
            "A travel brand specialising in the Balkans needed a storefront that turned wanderlust into bookings · fast, beautiful, and discoverable in search.",
        meta: {
            Role: "Product, Design & Dev",
            Type: "Travel storefront",
            Year: "2023",
            Stack: "Astro · Tailwind",
        },
        blocks: [
            {
                heading: "Context",
                body: [
                    "Trips sell on emotion and trust. The brand had stunning destinations but a site that loaded slowly and buried the details travellers actually need before they commit.",
                ],
            },
            {
                heading: "My role",
                body: [
                    "I worked across product, design and development · shaping how trips were presented, designing the funnel, and building the frontend that made it fast.",
                ],
            },
            {
                heading: "Constraints",
                list: [
                    "Imagery-heavy by nature · but images are the enemy of load time.",
                    "SEO was a primary acquisition channel: pages had to be fast and crawlable.",
                    "Content (trips, dates, prices) changed regularly and was owned by the team.",
                ],
            },
            {
                heading: "Technical decisions",
                body: [
                    "**Astro with static generation + incremental updates** gave us crawlable, instant-feeling pages that still reflected fresh trip content.",
                    "I made images earn their place: modern formats, responsive sizing, priority loading for the hero and lazy-loading everything below the fold · so a gallery-heavy page still felt instant.",
                ],
            },
            {
                heading: "Architecture",
                body: [
                    "Edge-served static trip pages, a content layer the team can update, lazy-loaded media galleries, and a shared component system that keeps every destination page consistent and fast.",
                ],
                diagram: true,
            },
            {
                heading: "UX decisions",
                body: [
                    "Each trip page leads with imagery and the three trust signals travellers want first · what's included, when, and how much · then deepens for those who keep scrolling.",
                    "The booking path was shortened to the fewest steps that still felt safe and reassuring.",
                ],
            },
            {
                heading: "Performance",
                metrics: [
                    { value: 1.4, decimals: 1, suffix: "s", label: "LCP (mobile)", delta: "image-heavy, still fast" },
                    { value: 90, suffix: "+", label: "Lighthouse (mobile)", delta: "image-heavy, still fast" },
                    { value: 0.03, decimals: 2, suffix: "", label: "CLS", delta: "stable gallery layout" },
                ],
                body: [
                    "The gains were deliberate, not lucky: disciplined image handling and static rendering let a visual-first site stay genuinely fast.",
                ],
            },
            {
                heading: "Trade-offs",
                list: [
                    "Static generation meant content updates propagate on rebuild/revalidate rather than instantly · an easy trade for speed and SEO.",
                    "Aggressive image optimisation added build complexity in exchange for a fast experience on every device.",
                ],
            },
            {
                heading: "Results",
                body: [
                    "A storefront that does justice to the destinations and loads fast enough to keep travellers in the funnel.",
                ],
            },
            {
                heading: "What I'd improve next",
                body: [
                    "I'd add structured data for rich search results and an itinerary builder so travellers can shape their own trip before reaching out.",
                ],
            },
        ],
    },

    "olga-photos": {
        slug: "olga-photos",
        title: "Olga Photos",
        eyebrow: "Case Study · 03",
        image: olga,
        problem:
            "A photographer's work deserved a portfolio that disappeared behind it · fast, quiet, and reverent to the image · instead of a noisy template.",
        meta: {
            Role: "Design & Frontend",
            Type: "Portfolio",
            Year: "2023",
            Stack: "HTML/CSS · Swiper",
        },
        blocks: [
            {
                heading: "Context",
                body: [
                    "Photographers are often stuck with generic gallery templates that compress their work, load slowly, and impose someone else's taste. The goal here was the opposite: an interface that gets out of the way.",
                ],
            },
            {
                heading: "My role",
                body: [
                    "Solo design and build · from the grid system and typography to the image pipeline and the restrained motion that frames each photo.",
                ],
            },
            {
                heading: "Constraints",
                list: [
                    "Large, high-quality images that must look pristine yet load quickly.",
                    "The interface had to feel premium without competing with the work.",
                    "Fully usable by keyboard and screen reader · accessibility isn't optional.",
                ],
            },
            {
                heading: "Technical decisions",
                body: [
                    "I built a **responsive image pipeline** · modern formats, multiple sizes, blur-up placeholders and lazy loading · so full-bleed photography stays crisp without punishing load time.",
                    "Motion is minimal and meaningful: a soft reveal as images enter, nothing that distracts from the photograph itself.",
                ],
            },
            {
                heading: "UX decisions",
                body: [
                    "Type, spacing and a calm palette were tuned so the eye always lands on the photo first. The gallery is keyboard-navigable and every image is properly described.",
                ],
            },
            {
                heading: "Performance",
                metrics: [
                    { value: 95, suffix: "+", label: "Lighthouse (mobile)", delta: "media-first build" },
                    { value: 1.3, decimals: 1, suffix: "s", label: "LCP", delta: "image-first, still fast" },
                ],
                body: [
                    "Proof that a media-heavy site can be both beautiful and fast when the image strategy is treated as engineering, not an afterthought.",
                ],
            },
            {
                heading: "Results",
                body: [
                    "A portfolio that feels like a gallery, not a template, and loads fast enough that visitors stay to look.",
                ],
            },
            {
                heading: "What I'd improve next",
                body: [
                    "A lightweight CMS so the photographer can curate sets herself, and an optional fullscreen viewer with gesture support on touch.",
                ],
            },
        ],
    },

    "integral-piscinas": {
        slug: "integral-piscinas",
        title: "Integral Piscinas",
        eyebrow: "Case Study · 04",
        image: integral,
        problem:
            "A pool design-and-build company needed a site that signalled craftsmanship and turned visitors into qualified enquiries · not just a brochure.",
        meta: {
            Role: "Design & Frontend",
            Type: "Business / lead-gen",
            Year: "2022",
            Stack: "Bootstrap · jQuery",
        },
        blocks: [
            {
                heading: "Context",
                body: [
                    "A pool is a high-trust, high-ticket purchase. The company's old presence didn't convey quality or make it easy to get in touch · so good leads slipped away.",
                ],
            },
            {
                heading: "My role",
                body: [
                    "Design and frontend, end to end · establishing a premium visual language and building a fast site engineered around a single goal: qualified enquiries.",
                ],
            },
            {
                heading: "Constraints",
                list: [
                    "Trust was everything · the design had to look as well-built as their pools.",
                    "Local SEO mattered: customers search by region and intent.",
                    "The enquiry flow had to be effortless on mobile.",
                ],
            },
            {
                heading: "Technical decisions",
                body: [
                    "I built a fast, statically rendered site with a **showcase-led structure**: real projects up front as proof, then a frictionless enquiry form as the clear next step.",
                    "Forms were built accessible and forgiving, with clear validation · because a confusing form on mobile is a lost lead.",
                ],
            },
            {
                heading: "UX decisions",
                body: [
                    "The narrative moves from *desire* (finished pools) to *trust* (process and craft) to *action* (a simple, reassuring enquiry) · the journey a real buyer takes.",
                ],
            },
            {
                heading: "Performance",
                metrics: [
                    { value: 92, suffix: "+", label: "Lighthouse (mobile)", delta: "lean build" },
                    { value: 1.5, decimals: 1, suffix: "s", label: "LCP (mobile)", delta: "lean, image-aware" },
                ],
                body: [
                    "Fast pages and a clear path to contact turn a brochure into a lead-generation tool.",
                ],
            },
            {
                heading: "Results",
                body: [
                    "A credible, conversion-focused presence that reflects the quality of the work.",
                ],
            },
            {
                heading: "What I'd improve next",
                body: [
                    "A project gallery filterable by pool type and budget, plus a guided cost estimator to pre-qualify leads before the first call.",
                ],
            },
        ],
    },
};
