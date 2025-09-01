import { Link, useLocation } from "react-router-dom";

export default function Navigation() {

    return (
        <nav className="navigation">
            <div className="nav-container">
                <div className="nav-brand">
                    <Link to={"/"} className="btn btn-primary">Início</Link>
                    <Link to={"/game"} className="btn btn-primary">Play</Link>
                    <Link to={"/about"} className="btn btn-primary">Sobre</Link>
                </div>
            </div>
        </nav>
    );
}