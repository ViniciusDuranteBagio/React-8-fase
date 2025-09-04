import { Link } from "react-router-dom"

export default function Navigation() {
    const isActive = (path) => {
        return location.pathname === path ? 'active':'';
    }

return (
    <nav className="navigation">
        <div className="nav-container">
            <div className="nav-brand">
                <Link to={"/"} className="nav-logo">
                Jogo da Velha
                </Link>
                <br></br>
                <Link to={"/game"}>Jogar</Link>
            </div>
        </div>
    </nav>
)
}