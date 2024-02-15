/* eslint-disable react/prop-types */
const CaseCards = ({ desc, title }) => {
    return (
        <div className="study-block">
            <h3>{title}</h3>
            <p>{desc}</p>
        </div>
    );
};

export default CaseCards;
