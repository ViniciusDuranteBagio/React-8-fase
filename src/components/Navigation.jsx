import { Link } from "react-router-dom";

export default function Navigation() {


    return (
        <nav>
            <div>
                <div>
                    <Link to={"/game"}>Jogar</Link>
                    <br></br>
                    <Link to={"/"}>Retornar</Link>
                </div>
            </div>
        </nav>
    );
}