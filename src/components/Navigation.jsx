import { Link } from "react-router-dom"

export default function Navigation () {
return (
    <nav className="navigation">
        <div className="nav-container">
            <div className="nav-brand">
                <Link to={"/game"}>Play</Link>
                <Link to ={"/home"}>Home</Link>
                <Link to ="/" className="nav-logo">Jogar</Link>
            </div>
        </div>
    </nav>
);
    
};

