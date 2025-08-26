import { Link } from "react-router-dom";
import '../styles.css';

export default function Navigation() {
    return (
        <nav className="navigation">
            <div className="nav-container">
                <div className="nav-brand">
                    <Link to={"/home"} className="nav-logo">
                        Home
                    </Link>
                    <Link to={"/game"} className="nav-logo">
                        Game
                    </Link>
                    <Link to={"/about"} className="nav-logo">
                        Sobre
                    </Link>
                </div>
            </div>
        </nav>
    )
}