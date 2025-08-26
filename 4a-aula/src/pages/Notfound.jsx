import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="about-page">
      <h1>Erro 404 🚨</h1>
      <div className="about-section">
        <h2>Ops, rota não encontrada...</h2>
        <p>
          Parece que você tentou acessar uma página que não existe no sistema.
          Mas não se preocupe, comandante, temos coordenadas de retorno.
        </p>
      </div>

      <div className="about-actions">
        <Link to="/" className="btn btn-primary">Ir para Início</Link>
        <Link to="/game" className="btn btn-primary">Jogar</Link>
      </div>
    </div>
  );
}

export default NotFound;