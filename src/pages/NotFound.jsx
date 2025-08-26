import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h1>404 – Página não encontrada</h1>
      <p>Ops! O endereço digitado não existe.</p>
      <Link to="/">Voltar para a Home</Link>
    </div>
  );
}