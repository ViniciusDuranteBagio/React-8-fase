import { Link, useLocation } from "react-router-dom";

export default function Navigation() {

    return (
        <nav className="navigation">
            <div className="nav-container">
                <div className="nav-brand">
                   <br /> <Link to={"/home"}>Início</Link><br />
                    <Link to={"/"}>Sobre</Link><br />
                    <Link to={"/game"}>Play</Link>
                </div>
            </div>
        </nav>
       );
}