/* ---------------------------------------------------------------------------
 * Site content for the Signal homepage narrative · sourced from Ezequiel's CV.
 * Testimonial quotes are placeholders (real wording / attribution to confirm).
 * ------------------------------------------------------------------------- */

export const profile = {
    name: "Ezequiel Gonzalez",
    alias: "Pila",
    role: "Senior Frontend Engineer",
    location: "Berlin, Germany",
    timezone: "Europe/Berlin",
    email: "pilag6@gmail.com",
    phone: "+49 1745735026",
    website: "https://pilagonzalez.com",
    websiteLabel: "pilagonzalez.com",
    github: "https://github.com/Pilag6",
    githubLabel: "github.com/Pilag6",
    linkedin: "https://www.linkedin.com/in/pila-gonzalez",
    linkedinLabel: "in/pila-gonzalez",
    availability: "Open to senior frontend roles",
    // brands worth name-dropping, most recognisable first
    previously: ["Skyscanner", "Konvo GmbH", "Cileria GmbH", "DCI Berlin"],
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

export const journey = [
    {
        year: "2025 – Now",
        role: "Frontend Software Engineer",
        org: "Konvo GmbH · Berlin",
        note: "Led the platform's frontend rebuild from scratch in Vue + TypeScript, and designed a company-wide design system of reusable components. Shipped a complex, business-critical feature with zero production regressions.",
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
            "Pila rebuilt our frontend from the ground up and gave us a design system the whole team now relies on. He ships complex, critical work without drama, and without regressions.",
        name: "Engineering Lead",
        org: "Konvo GmbH",
    },
    {
        quote:
            "He thinks in systems and names every trade-off out loud. Performance, UX and clean code all improved measurably while he was on the team.",
        name: "Product Lead",
        org: "Cileria GmbH",
    },
];

export const proofMetrics = [
    { value: 14, suffix: "+", label: "Years shipping" },
    { value: 30, suffix: "%", label: "Faster load times (Skyscanner)" },
    { value: 25, suffix: "%", label: "Perf gain (Cileria)" },
];
