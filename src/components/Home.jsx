import AboutSection from "@components/About/AboutSection.jsx";
import BlogSection from "@components/Blog/BlogSection.jsx";
import CaseOfStudy from "@components/CaseOfStudy/CaseOfStudy.jsx";
import Header from "@components/Header/Header.jsx";
import Hero from "@components/Hero/Hero.jsx";
import ProjectsSection from "@components/Projects/ProjectsSection.jsx";
import SmallProjects from "@components/SmallProjects/SmallProjects.jsx";


const Home = () => {
    const copy = `${new Date().getFullYear()}`;

    return (
        <>
            <Header />
            <Hero />
            <ProjectsSection />
            <SmallProjects />
            <BlogSection />
            <AboutSection />
            <CaseOfStudy />

            <footer>© {copy} | Ezequiel &apos;Pila&apos; Gonzalez</footer>
        </>
    );
};

export default Home;
