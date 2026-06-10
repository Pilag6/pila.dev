import DevelopmentNotes from "@components/DevelopmentNotes/DevelopmentNotes.jsx";
import Header from "@components/Header/Header.jsx";

const DevelopmentNotesPage = () => {
    const copy = `${new Date().getFullYear()}`;

    return (
        <>
            <Header />
            <DevelopmentNotes />
            <footer>© {copy} | Ezequiel &apos;Pila&apos; Gonzalez</footer>
        </>
    );
};

export default DevelopmentNotesPage;
