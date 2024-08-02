const SmallProjectCard = ({ title, image, url }) => {
    return (
        <article className="small-article">
            <a href={url} target="_blank" rel="noreferrer">
                <img src={image} alt={title} />
            </a>
        </article>
    );
};
export default SmallProjectCard;
