import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
    // const location = useLocation();
    return (
        <nav>
            <div>
                <div>
                    <Link to={"/jogo"}>Jogo</Link>
                    <br />
                    <Link to={"/"}>Inicio</Link>
                </div>
            </div>
        </nav>
    );
}