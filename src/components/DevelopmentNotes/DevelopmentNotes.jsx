import { useEffect, useMemo, useRef, useState } from "react";
import {
    FaArrowLeftLong,
    FaArrowRightLong,
    FaCode,
    FaMagnifyingGlass,
} from "react-icons/fa6";
import {
    developmentNotes,
    developmentNoteTags,
} from "@/content/development-notes";
import "./DevelopmentNotes.css";

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(new Date(date));

const NOTES_PER_PAGE = 4;

const DevelopmentNotes = () => {
    const [selectedSlug, setSelectedSlug] = useState(developmentNotes[0]?.slug);
    const [activeTag, setActiveTag] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [canScrollTagsLeft, setCanScrollTagsLeft] = useState(false);
    const [canScrollTagsRight, setCanScrollTagsRight] = useState(false);
    const tagsListRef = useRef(null);

    const updateTagScrollState = () => {
        const tagsList = tagsListRef.current;

        if (!tagsList) return;

        const maxScrollLeft = tagsList.scrollWidth - tagsList.clientWidth;

        setCanScrollTagsLeft(tagsList.scrollLeft > 0);
        setCanScrollTagsRight(tagsList.scrollLeft < maxScrollLeft - 1);
    };

    const scrollTags = (direction) => {
        tagsListRef.current?.scrollBy({
            left: direction * 220,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const tagsList = tagsListRef.current;

        if (!tagsList) return undefined;

        updateTagScrollState();

        const resizeObserver = new ResizeObserver(updateTagScrollState);

        tagsList.addEventListener("scroll", updateTagScrollState);
        resizeObserver.observe(tagsList);

        return () => {
            tagsList.removeEventListener("scroll", updateTagScrollState);
            resizeObserver.disconnect();
        };
    }, []);

    const normalizedSearch = searchQuery.trim().toLowerCase();
    const filteredNotes = useMemo(() => developmentNotes.filter((note) => {
        const matchesTag = activeTag === "All" || note.tags.includes(activeTag);
        const searchableText = `${note.title} ${note.excerpt} ${note.tags.join(" ")}`.toLowerCase();

        return matchesTag && searchableText.includes(normalizedSearch);
    }), [activeTag, normalizedSearch]);
    const totalPages = Math.ceil(filteredNotes.length / NOTES_PER_PAGE);
    const paginatedNotes = filteredNotes.slice(
        (currentPage - 1) * NOTES_PER_PAGE,
        currentPage * NOTES_PER_PAGE,
    );
    const selectedNote =
        filteredNotes.find((note) => note.slug === selectedSlug) || filteredNotes[0];
    const SelectedNoteContent = selectedNote?.Component;

    useEffect(() => {
        setCurrentPage(1);
    }, [activeTag, searchQuery]);

    useEffect(() => {
        if (paginatedNotes.length === 0) return;

        const selectedNoteIsVisible = paginatedNotes.some(
            (note) => note.slug === selectedSlug,
        );

        if (!selectedNoteIsVisible) {
            setSelectedSlug(paginatedNotes[0].slug);
        }
    }, [currentPage, paginatedNotes, selectedSlug]);

    return (
        <section
            className="development-notes"
            id="development-notes"
            aria-labelledby="development-notes-title"
        >
            <div className="development-notes__header">
                <div>
                    <p className="development-notes__eyebrow">
                        <FaCode aria-hidden="true" /> Software writing
                    </p>
                    <h2 id="development-notes-title">Development Notes</h2>
                    <p>
                        Practical notes about frontend systems, tooling,
                        architecture, and the decisions behind building software.
                    </p>
                </div>
            </div>

            <div className="development-notes__tools" aria-label="Development notes filters">
                <div className="development-notes__search-block">
                    <span className="development-notes__tools-label">Find a note</span>
                    <label className="development-notes__search">
                        <FaMagnifyingGlass aria-hidden="true" />
                        <span className="sr-only">Search development notes</span>
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            placeholder="Search by name, summary, or tag"
                        />
                    </label>
                </div>

                <div className="development-notes__tag-block">
                    <span className="development-notes__tools-label">Filter by tag</span>
                    <div className="development-notes__tags-wrap">
                        {canScrollTagsLeft ? (
                            <button
                                className="development-notes__tags-arrow development-notes__tags-arrow--left"
                                type="button"
                                onClick={() => scrollTags(-1)}
                                aria-label="Show previous tags"
                            >
                                <FaArrowLeftLong />
                            </button>
                        ) : null}
                        <div
                            className="development-notes__tags"
                            aria-label="Filter by tag"
                            ref={tagsListRef}
                        >
                            {["All", ...developmentNoteTags].map((tag) => (
                                <button
                                    className={tag === activeTag ? "is-active" : undefined}
                                    key={tag}
                                    type="button"
                                    onClick={() => setActiveTag(tag)}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                        {canScrollTagsRight ? (
                            <button
                                className="development-notes__tags-arrow development-notes__tags-arrow--right"
                                type="button"
                                onClick={() => scrollTags(1)}
                                aria-label="Show more tags"
                            >
                                <FaArrowRightLong />
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>

            <div className="development-notes__layout">
                <div className="development-notes__list" aria-label="Development notes list">
                    {filteredNotes.length > 0 ? (
                        paginatedNotes.map((note) => (
                            <button
                                className={
                                    note.slug === selectedNote?.slug
                                        ? "development-notes__card is-selected"
                                        : "development-notes__card"
                                }
                                key={note.slug}
                                type="button"
                                onClick={() => setSelectedSlug(note.slug)}
                            >
                                <span className="development-notes__card-meta">
                                    {formatDate(note.date)} · {note.readingTime}
                                </span>
                                <strong>{note.title}</strong>
                                <span>{note.excerpt}</span>
                                <span className="development-notes__card-tags">
                                    {note.tags.map((tag) => (
                                        <span key={tag}>{tag}</span>
                                    ))}
                                </span>
                            </button>
                        ))
                    ) : (
                        <p className="development-notes__empty">
                            No notes match that search yet.
                        </p>
                    )}

                    {totalPages > 1 ? (
                        <nav
                            className="development-notes__pagination"
                            aria-label="Development notes pagination"
                        >
                            <button
                                type="button"
                                onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                Prev
                            </button>
                            <span>
                                {currentPage} / {totalPages}
                            </span>
                            <button
                                type="button"
                                onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </nav>
                    ) : null}
                </div>

                {selectedNote && SelectedNoteContent ? (
                    <article className="development-notes__article">
                        <header>
                            <p>{formatDate(selectedNote.date)} · {selectedNote.readingTime}</p>
                            <h3>{selectedNote.title}</h3>
                            <div className="development-notes__article-tags">
                                {selectedNote.tags.map((tag) => (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => setActiveTag(tag)}
                                    >
                                        #{tag}
                                    </button>
                                ))}
                            </div>
                        </header>
                        <SelectedNoteContent />
                    </article>
                ) : null}
            </div>
        </section>
    );
};

export default DevelopmentNotes;
