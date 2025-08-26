import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="navigation">
        <div className = "nav-container" >
            <div className="nav-brand">🎮
             <Link to="/game">play </Link>
             <Link to="/"> | Home </Link>
             <Link to="/" className ="nav-logo" >
                - Joga da Velha
             </Link>
             </div>
        </div>
    </nav>
  );
}