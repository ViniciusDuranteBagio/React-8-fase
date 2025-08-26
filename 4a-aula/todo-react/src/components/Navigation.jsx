import { Link } from "react-router-dom";
import '../styles.css';

export default function Navigation() {
    return (
        <nav className="navigation">
            <div className="nav-container">
                <div className="nav-brand">
                    <Link to={"/game"} className="nav-logo">
                        Game
                    </Link>
                    <Link to={"/home"} className="nav-logo">
                        Home
                    </Link>
                </div>
            </div>
        </nav>
    )
}