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
                {/* Signal — the live homepage, full-bleed (outside the legacy .wrapper) */}
                <Route path="/" element={<SignalShowcase />} />
                <Route path="/work/:slug" element={<CaseStudy />} />

                {/* Legacy aliases — keep old /signal links working */}
                <Route path="/signal" element={<SignalShowcase />} />
                <Route path="/signal/work/:slug" element={<CaseStudy />} />

                {/* Previous site — preserved at /legacy */}
                <Route
                    path="/legacy"
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
