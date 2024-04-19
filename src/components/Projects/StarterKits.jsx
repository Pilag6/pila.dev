/* eslint-disable react/prop-types */
import "./StarterKits.css";

const StarterKits = ({ startingImg, starterLink }) => {
    return (
        <article className="starter-article">
            <a href={starterLink} target="_blank" rel="noreferrer" >
                <div className="starter-img">
                    <img src={startingImg} alt="" />
                </div>
            </a>
        </article>
    );
};
export default StarterKits;
