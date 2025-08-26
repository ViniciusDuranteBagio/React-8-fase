import { Link } from "react-router-dom";
export default function Navigation() {

  return (
    <nav>
      <div>
        <div>
          <Link to={"/game"}>Play</Link>
          <br />
          <Link to={"/"}>Home</Link>
        </div>
      </div>
    </nav>
  );

}