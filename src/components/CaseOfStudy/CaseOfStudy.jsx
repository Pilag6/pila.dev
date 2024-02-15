import CaseCards from "./CaseCards.jsx";
import "./CaseOfStudy.css";

import drawHeroArrow from "../../assets/draw-hero-arrow.svg";

const CaseOfStudy = () => {
    return (
        <div className="study-container">
            <h2>Case Study</h2>
            <div className="study-cards-wrapper">
                <CaseCards
                    title={"Inspiration"}
                    desc={
                        "For a while, I had been intrigued by the New Brutalism design trend and decided to take on the challenge of creating my own website in this style. After studying various designs within this trend, I opted to follow the New Brutalism with a mix of Memphis style, but with a slightly muted color palette. The vibrant colors initially associated with the trend were too intense for my taste."
                    }
                />

                <img src={drawHeroArrow} alt="" />
                <CaseCards
                    title={"Design"}
                    desc={
                        "I began the design process in Figma, drawing inspiration from the community and utilizing resources available there. I create the color palette and choose the typography, and then I started to design the components. I used the Auto Layout feature to create the responsive design. Finaly, I created a prototype to test the user experience and I downloaded the drawings in SVG format to use them in the development phase."
                    }
                />

                <img src={drawHeroArrow} alt="" />
                <CaseCards
                    title={"Development"}
                    desc={
                        "Now it was the time to create the the website. I used React with Vite as a library/framework. CSS Grid in combination with Flexbox to create the layout. I also created some CSS variables to manage the colors, fonts, border, shadows and paddings. I also used the Lighthouse tool to optimize the website for performance and SEO. Finally, I deployed the website first in GitHub and then I linked it to Netlify."
                    }
                />
            </div>

            <div className="study-achievment">
                <h3>What I achieved</h3>
                <ul>
                    <li>
                        <strong>Hover Effects:</strong> I&apos;ve mastered hover
                        effects by using the ~ selector to apply dynamic changes
                        to various elements when hovering over a specific one.
                        This is evident in the top navigation bar where hovering
                        over &apos;About&apos; moves an arrow above it.
                        Similarly, in &apos;My Curriculum&apos; and &apos;My
                        Projects&apos; buttons, the middle arrows change
                        direction on hover. I strategically ordered elements
                        using the order property, allowing the last HTML
                        element, the arrow, to appear in the middle of the
                        buttons..
                    </li>
                    <li>
                        <strong>Spotify-Style Cards:</strong> Creating the
                        Spotify-style cards proved to be the most substantial
                        challenge. While designing, I underestimated the
                        complexity of implementing them. Thanks to the
                        flexibility of display: flex, I managed to develop a
                        design that closely resembled the original in Figma.
                        However, this required nesting numerous div elements and
                        dealing with complex class naming
                        (class=&apos;the-div-of-the-div-of-the-div&apos;). To
                        achieve that, I simplified the approach and isolated
                        each card into its own components.
                    </li>
                    <li>
                        <strong>Positioning: </strong>I delved into the
                        extensive use of position: absolute, aiming to constrain
                        elements within their parent containers to achieve
                        precise layouts. This approach taught me the importance
                        of not allowing parent elements to become overly broad.
                    </li>
                    <li>
                        <strong>Flex-Wrap:</strong> This CSS property
                        facilitates responsive design effortlessly by allowing
                        flex items to wrap onto multiple lines. Its
                        implementation eliminates the necessity for additional
                        media queries, streamlining the development process.
                    </li>
                    <li>
                        <strong>Extra details:</strong> <br />
                        <br />
                        <strong>Open Graph Cards:</strong> I added Open Graph
                        cards for improved social sharing.
                        <br /> <strong>Cursor Styles:</strong> I customized the
                        cursor styles for various decorative elements on the
                        website.
                        <br /> <strong>Scrollbar and Text Selection:</strong> I
                        adjusted the scrollbar and text selection styles to
                        align with the overall design.
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default CaseOfStudy;
