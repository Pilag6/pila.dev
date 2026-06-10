const noteModules = import.meta.glob("./*.mdx", { eager: true });

export const developmentNotes = Object.values(noteModules)
    .map((module) => ({
        ...module.metadata,
        Component: module.default,
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

export const developmentNoteTags = [
    ...new Set(developmentNotes.flatMap((note) => note.tags)),
].sort((a, b) => a.localeCompare(b));
