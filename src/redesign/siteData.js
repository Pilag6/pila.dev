/* ---------------------------------------------------------------------------
 * Site content for the Signal homepage narrative · sourced from Ezequiel's CV.
 * Testimonials sourced from LinkedIn recommendations (summarized for brevity).
 * ------------------------------------------------------------------------- */

export const profile = {
    name: "Ezequiel Gonzalez",
    alias: "Pila",
    role: "Senior Frontend Engineer",
    location: "Berlin, Germany",
    email: "pilag6@gmail.com",
    phone: "+49 1745735026",
    website: "https://pilagonzalez.com",
    websiteLabel: "pilagonzalez.com",
    github: "https://github.com/Pilag6",
    githubLabel: "github.com/Pilag6",
    linkedin: "https://www.linkedin.com/in/pila-gonzalez",
    linkedinLabel: "in/pila-gonzalez",
    // brands worth name-dropping, most recognisable first
    previously: ["Skyscanner", "Konvo GmbH", "Cileria GmbH"],
};

export const capabilities = [
    {
        id: "architecture",
        title: "Frontend Architecture",
        body: "Taking products from concept to production with structures that stay flexible as they scale.",
        items: ["Vue", "Nuxt", "React", "Next.js", "TypeScript", "Migrations"],
    },
    {
        id: "design-systems",
        title: "Design Systems",
        body: "Company-wide systems of reusable components and consistent UI standards teams build on for years.",
        items: ["Design tokens", "Component APIs", "Tailwind CSS", "Figma", "Theming"],
    },
    {
        id: "performance",
        title: "Performance",
        body: "Measurable speed wins · 25–30% load-time reductions through lean, deliberate frontend work.",
        items: ["Core Web Vitals", "Bundle analysis", "Code-splitting", "Vite", "Profiling"],
    },
    {
        id: "fullstack",
        title: "Full-Stack Range",
        body: "Comfortable across the stack when the product needs it · APIs, data and delivery, not just the view.",
        items: ["Node.js", "PostgreSQL", "REST", "gRPC", "Vercel", "Cloudflare"],
    },
    {
        id: "ux",
        title: "Product & UX",
        body: "Design background and user research that turn ambiguous ideas into user-focused, shippable products.",
        items: ["Prototyping", "User research", "Figma", "Accessibility", "Microinteractions"],
    },
    {
        id: "ai",
        title: "AI Integration",
        body: "Bringing LLMs into real products · retrieval, embeddings and assistants that actually help users.",
        items: ["RAG systems", "Embeddings", "LLM integration", "Vector search"],
    },
];

export const sideProjects = [
    {
        title: "Perfect Four",
        type: "Logic game",
        url: "https://perfect-4.netlify.app/",
        focus: "Deduction, trial-and-error loops, and turning a childhood paper-and-pen number game into an interactive web experience.",
    },
    {
        title: "Password Generator",
        type: "Vanilla JavaScript utility",
        url: "https://the-projects-js.netlify.app/03-passgen/",
        focus: "Core logic, DOM manipulation, and practical password generation without framework dependencies.",
    },
    {
        title: "Gradient Color Generator",
        type: "Vanilla JavaScript visual tool",
        url: "https://the-projects-js.netlify.app/04-gradientgen/",
        focus: "Events, simple state, dynamic styles, and UX fundamentals for fast visual feedback.",
    },
    {
        title: "Word Counter Pro",
        type: "Text analysis app",
        url: "https://the-projects-js.netlify.app/08-wordscounter/",
        focus: "String processing, forms, and immediate feedback for word, character, and related metrics.",
    },
    {
        title: "Fliplingua",
        type: "Mobile-first React app",
        url: "https://fliplingua.com/",
        focus: "Language-learning flashcards, interactive study flows, and mobile-first interface design.",
    },
    {
        title: "Codingify",
        type: "Developer typing game",
        url: "https://codinify.vercel.app/",
        focus: "Speed, accuracy, and code-oriented typing practice for developers.",
    },
    {
        title: "Writing Hearth",
        type: "Long-form writing app",
        focus: "Novel and book writing organized by chapters, narrative structure, and creative continuity.",
    },
    {
        title: "Macondo",
        type: "Daily writing app",
        focus: "Habit-building, idea capture, and a simple personal workflow for daily writing.",
    },
    {
        title: "Workout App",
        type: "Personal training app",
        focus: "Practical dumbbell and bodyweight routines adapted to a real exercise context.",
    },
];

/* Tech stack · ids map to icons in components/Stack.jsx, colors are brand hues.
   Order matters: React, Vue, Next, TypeScript sit in the middle of the arc. */
export const stack = [
    { id: "posthog", label: "PostHog", color: "#f9bd2b" },
    { id: "javascript", label: "JavaScript", color: "#f7df1e" },
    { id: "node", label: "Node.js", color: "#5fa04e" },
    { id: "postgres", label: "PostgreSQL", color: "#4f8edb" },
    { id: "zod", label: "Zod", color: "#3e63dd" },
    { id: "tanstack", label: "TanStack", color: "#ff4154" },
    { id: "storybook", label: "Storybook", color: "#ff4785" },
    { id: "nuxt", label: "Nuxt", color: "#00dc82" },
    { id: "react", label: "React", color: "#61dafb" },
    { id: "vue", label: "Vue", color: "#42b883" },
    { id: "next", label: "Next.js", color: "#e8e8ea" },
    { id: "typescript", label: "TypeScript", color: "#3178c6" },
    { id: "turborepo", label: "Turborepo", color: "#ef4444" },
    { id: "tailwind", label: "Tailwind", color: "#38bdf8" },
    { id: "vite", label: "Vite", color: "#b07cff" },
    { id: "three", label: "Three.js", color: "#e8e8ea" },
    { id: "docker", label: "Docker", color: "#2496ed" },
    { id: "figma", label: "Figma", color: "#f24e1e" },
];

export const journey = [
    {
        year: "2025 – 2026",
        role: "Frontend Software Engineer",
        org: "Konvo GmbH · Berlin",
        note: "Contributed to the platform's frontend rebuild from scratch in Vue + TypeScript, and helped build a company-wide design system of reusable components. Shipped a complex, business-critical feature with zero production regressions.",
    },
    {
        year: "2024 – 2025",
        role: "Full-Stack Developer",
        org: "Cileria GmbH · Berlin",
        note: "Built and optimised scalable apps in TypeScript, React and Node.js · cutting load times by ~25%, and turned client requirements into clear, user-friendly prototypes.",
    },
    {
        year: "2023 – 2024",
        role: "Full-Stack Developer",
        org: "DCI Digital Career Institute · Berlin",
        note: "Mentored and taught full-stack development through interactive, multimedia-driven sessions · tailoring support to help students overcome real obstacles.",
    },
    {
        year: "2020 – 2023",
        role: "Full-Stack Developer & Product Designer",
        org: "Cripto Ecosystem · LATAM",
        note: "Owned product design and full development of the platform · from sketching and prototyping to user research, and cut turnaround time by 20%.",
    },
    {
        year: "2018 – 2019",
        role: "Frontend Developer",
        org: "Skyscanner · United Kingdom",
        note: "Reduced front-end load times by ~30% through efficient code and resource management, working closely with design and backend for seamless UI integration.",
    },
    {
        year: "2012 – 2018",
        role: "Web Developer",
        org: "Freelance & studios",
        note: "The years that built the craft · shipping web products across stacks and clients in Latin America and Europe before specialising in frontend.",
    },
];

export const testimonials = [
    {
        quote:
            "An exceptional full-stack developer — React, Next.js, Node — with a gift for intuitive, fluid web experiences. His technical and human skills make him invaluable to any team.",
        name: "Jenny Tejedor",
        org: "Growth Marketing · Web3",
    },
    {
        quote:
            "Built our website from scratch in weeks with outstanding professionalism — design, branding, and delivery above expectations, with a client-first mindset throughout.",
        name: "Matias Canil",
        org: "River Plate Berlin Fan Club",
    },
];

export const proofMetrics = [
    { value: 50, suffix: "+", label: "Projects involved" },
    { value: 25, suffix: "%", label: "Perf gain · Cileria" },
    { value: 20, suffix: "%", label: "Faster turnaround · Cripto" },
];
