/* eslint-disable react/prop-types */
import "./ProjectsRelease.css";

// import { IoPlay } from "react-icons/io5";

import releaseStar from "../../assets/draw-one-star.svg";
import releaseCurly from "../../assets/draw-curvyArrow-1.svg";

const ProjectsRelease = ({
    title,
    bgRelease,
    imgTitleRelease,
    imgRelease,
    urlRelease,
    releaseTitle,
    releaseDescription,
}) => {
    return (
        <article className="realease-article">
            {/* <!-- Release Card Title --> */}
            <div className="release-card__title">
                <div className="release-card__title-img">
                    <img src={imgTitleRelease} alt="" />
                </div>
                <h3>{title}</h3>
                <img
                    className="realease-title-curly"
                    src={releaseCurly}
                    alt=""
                />
                <img className="release-star" src={releaseStar} alt="" />
                {/* <IoPlay className="release-play" /> */}
            </div>

            {/* <!-- Release Card Content --> */}

            <a href={urlRelease}>
                <div
                    className="release-card__content"
                    style={{ background: bgRelease }}
                >
                    <div className="release-card__content-img">
                        <img src={imgRelease} alt="" />
                    </div>

                    <div className="release-card__content-right">
                        <div>
                            <h3>{releaseTitle}</h3>
                            <p>{releaseDescription}</p>
                        </div>
                    </div>
                </div>
            </a>
        </article>
    );
};

export default ProjectsRelease;
