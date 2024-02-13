/* eslint-disable react/prop-types */
import { FaAngleDown } from "react-icons/fa6";
import { FaEllipsisVertical } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { AiFillStepBackward } from "react-icons/ai";
import { IoPlay } from "react-icons/io5";
import { AiFillStepForward } from "react-icons/ai";
import { FaShuffle } from "react-icons/fa6";
// import { IoMdShare } from "react-icons/io";
// import { FaSliders } from "react-icons/fa6";

import drawHeroText from "../../assets/draw-hero-text.svg";

import "./ProjectsCards.css";

const ProjectsCards = ({
    title,
    bgCard,
    image,
    span,
    widthSpan,
    time1,
    time2,
    url
}) => {
    return (
        <article className="card-article">
            <div className="card-container" style={{ background: bgCard }}>
                {/* <!-- #1 Line --> */}
                <div className="line-1">
                    <FaAngleDown className="fa-angle-down" />
                    <h3>PROJECT IN YOUR PLAYLIST</h3>
                    <FaEllipsisVertical className="ellipsis-vertical" />
                </div>

                {/* <!-- #2 Line --> */}
                <a href={url} title="Go to Project" aria-label="Go to Project" target="_blank" rel="noreferrer">
                    <div className="line-2">
                        <div className="card-img">
                            <img src={image} alt="" />
                        </div>
                    </div>
                </a>

                {/* <!-- #3 Line --> */}
                <div className="line-3">
                    <div className="line-3-title">
                        <h2>{title}</h2>
                        <img
                            className="line-3-title-draw"
                            src={drawHeroText}
                            alt=""
                        />
                    </div>
                    <p>PILA GONZALEZ</p>

                    <div className="progress-div">
                        <span
                            className={span}
                            style={{ width: widthSpan }}
                        ></span>
                    </div>

                    <div className="time">
                        <p>{time1}</p>
                        <p>{time2}</p>
                    </div>
                </div>

                {/* <!-- #4 Line --> */}
                <div className="line-4">
                    <FaRegHeart className="line-4-icons line-4-heart"/>
                    <AiFillStepBackward className="line-4-icons line-4-back"/>

                    <a href={url} title="Go to Project" aria-label="Go to Project" target="_blank" rel="noreferrer">
                        <IoPlay className="line-4-icons line-4-play"/>
                    </a>

                    <AiFillStepForward className="line-4-icons line-4-forward"/>
                    <FaShuffle className="line-4-icons line-4-shuffle"/>
                </div>

                {/* <!-- #5 Line -->
                <div className="line-5">
                    <IoMdShare />
                    <FaSliders />
                </div> */}
            </div>
        </article>
    );
};

export default ProjectsCards;
