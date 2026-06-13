import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import DevelopmentNotesPage from "./pages/DevelopmentNotesPage.jsx";
import SignalShowcase from "./redesign/SignalShowcase.jsx";
import CaseStudy from "./redesign/CaseStudy.jsx";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Signal redesign — full-bleed, rendered outside the legacy .wrapper */}
                <Route path="/signal" element={<SignalShowcase />} />
                <Route path="/signal/work/:slug" element={<CaseStudy />} />

                {/* Legacy site — keeps the original centered wrapper layout */}
                <Route
                    path="/"
                    element={
                        <div className="wrapper">
                            <Home />
                        </div>
                    }
                />
                <Route
                    path="/development-notes"
                    element={
                        <div className="wrapper">
                            <DevelopmentNotesPage />
                        </div>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
