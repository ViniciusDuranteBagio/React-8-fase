import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
    const location = useLocation();
    return (
        <nav className="navigation">
            <div className="nav-container">
                <div className="nav-brand">
                    <span className="nav-logo">React 8ª Fase</span>
                </div>
                <div className="nav-menu">
                    <Link to="/home" className={`nav-link${location.pathname === "/home" ? " active" : ""}`}>Início</Link>
                    <Link to="/" className={`nav-link${location.pathname === "/" ? " active" : ""}`}>Sobre</Link>
                    <Link to="/game" className={`nav-link${location.pathname === "/game" ? " active" : ""}`}>Play</Link>
                </div>
            </div>
            {/* nav-summary removido, conteúdo agora está em Sobre.jsx */}
        </nav>
    );
}