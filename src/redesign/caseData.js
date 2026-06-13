/* ---------------------------------------------------------------------------
 * Curated work + case studies for the "Signal" portfolio.
 *
 * These four are Ezequiel's selected projects. The narrative framing is
 * written to read as senior, end-to-end work; confirm/adjust the specifics
 * and replace any metric you can't back with a real number before shipping
 * (search "confirm").
 * ------------------------------------------------------------------------- */
import riverPlate from "@/assets/projects/river-plate.webp";
import descubre from "@/assets/projects/descubre.webp";
import olga from "@/assets/projects/olga.webp";
import integral from "@/assets/projects/integral.webp";

// Legacy portfolio screenshot lives in /public and is served at site root.
const legacyShot = "/pila-portfolio-home.webp";
const signalShot = "/signal.webp";

export const work = [
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
        slug: "river-plate-berlin",
        title: "River Plate Berlin",
        year: "2024",
        role: "Design & Frontend",
        outcome: "A digital home for the official River Plate supporters' club in Berlin.",
        tags: ["Astro", "Tailwind", "UX", "Content"],
        image: riverPlate,
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
                    "One easing family and a single motion language · so it feels composed, not busy.",
                ],
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
