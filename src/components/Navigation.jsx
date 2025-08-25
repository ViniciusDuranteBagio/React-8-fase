import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="navigation">
      <h1>Meu App</h1>
      <ul>
        <li>
          <Link to="/">Jogo da Velha</Link>
        </li>
        {/* Adicione outros links se necessário */}
      </ul>
    </nav>
  );
}