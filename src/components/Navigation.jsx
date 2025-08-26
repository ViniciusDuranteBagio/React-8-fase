import { useLocation, Link } from "react-router-dom";

export default function Navigation(){
    return (
        <nav className="navigation">
            <div className="nav-container">
                <div className="nav-brand">
                    <Link to={'/game'} className="nav-logo">
                        Jogo da Velha
                    </Link>
                    <br></br>
                    <Link to={'/'} className="nav-logo">
                        Home
                    </Link>
                </div>
            </div>
        </nav>
    )
}