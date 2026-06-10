import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import DevelopmentNotesPage from "./pages/DevelopmentNotesPage.jsx";
import "./App.css";

function App() {
    return (
        <div className="wrapper">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/development-notes" element={<DevelopmentNotesPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
