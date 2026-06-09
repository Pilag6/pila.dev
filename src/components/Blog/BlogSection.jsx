import { FaArrowRightLong, FaCode, FaPenNib } from "react-icons/fa6";
import "./BlogSection.css";

const BlogSection = () => {
    return (
        <section className="blog" id="blog" aria-labelledby="blog-title">
            <div className="blog-logo">
                <h2 id="blog-title">Writing</h2>
            </div>

            <div className="blog-content">
                <article className="blog-card blog-card--dev" aria-labelledby="blog-dev-title">
                    <div className="blog-card__icon" aria-hidden="true">
                        <FaCode />
                    </div>
                    <p className="blog-card__eyebrow">Coming soon</p>
                    <h3 id="blog-dev-title">Development Notes</h3>
                    <p>
                        Practical writing about frontend, tools, architecture,
                        and the decisions behind building software.
                    </p>
                    <button className="blog-card__action" type="button" disabled>
                        Not available yet
                    </button>
                </article>

                <article className="blog-card blog-card--literary" aria-labelledby="blog-literary-title">
                    <div className="blog-card__icon" aria-hidden="true">
                        <FaPenNib />
                    </div>
                    <p className="blog-card__eyebrow">Poems, stories, chronicles</p>
                    <h3 id="blog-literary-title">Literary Journal</h3>
                    <p>
                        Creative texts, travel fragments, poems, short stories,
                        and chronicles collected in one place.
                    </p>
                    <a
                        className="blog-card__action"
                        href="https://pilablog.netlify.app/"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Open Literary Journal in a new tab"
                    >
                        Read the journal <FaArrowRightLong aria-hidden="true" />
                    </a>
                </article>
            </div>
        </section>
    );
};

export default BlogSection;
