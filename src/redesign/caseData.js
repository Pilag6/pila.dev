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

export const work = [
    {
        slug: "river-plate-berlin",
        title: "River Plate Berlin",
        year: "2024",
        role: "Design & Frontend",
        outcome: "A digital home for the official River Plate supporters' club in Berlin.",
        tags: ["Vue", "Nuxt", "Tailwind", "UX"],
        image: riverPlate,
    },
    {
        slug: "descubre-balcanes",
        title: "Descubre Balcanes",
        year: "2023",
        role: "Product, Design & Dev",
        outcome: "A travel brand's storefront for discovering the Balkans · built to convert.",
        tags: ["React", "Next.js", "Performance", "SEO"],
        image: descubre,
    },
    {
        slug: "olga-photos",
        title: "Olga Photos",
        year: "2023",
        role: "Design & Frontend",
        outcome: "A cinematic portfolio that lets the photography lead, not the interface.",
        tags: ["React", "Image perf", "Motion", "A11y"],
        image: olga,
    },
    {
        slug: "integral-piscinas",
        title: "Integral Piscinas",
        year: "2022",
        role: "Design & Frontend",
        outcome: "A credible, conversion-focused site for a pool design & build company.",
        tags: ["Vue", "Tailwind", "SEO", "Forms"],
        image: integral,
    },
];

export const caseStudies = {
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
            Stack: "Vue · Nuxt · Tailwind",
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
                    "I built on **Nuxt for static generation**: fast, crawlable, and cheap to host on the edge · the right call for a content site that changes weekly, not by the second.",
                    "Content was structured so members can update matches and events without touching code, keeping the club self-sufficient after handoff.",
                ],
            },
            {
                heading: "Architecture",
                body: [
                    "A statically generated Nuxt site served from the edge, a lightweight content layer the club owns, and a small, reusable component system carrying the brand consistently across every page.",
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
            Stack: "React · Next.js · Tailwind",
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
                    "**Next.js with static generation + incremental updates** gave us crawlable, instant-feeling pages that still reflected fresh trip content.",
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
            Stack: "React · Vite · Tailwind",
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
            Stack: "Vue · Tailwind",
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
