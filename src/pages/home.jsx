import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Bem-vindo ao Jogo da Velha!</h1>
        <p>Um projeto React educativo para aprender os conceitos fundamentais</p>
        <div className="hero-buttons">
          <Link to="/game" className="btn btn-primary">
            Jogar Agora
          </Link>
          <Link to="/about" className="btn btn-secondary">
            Sobre o Projeto
          </Link>
        </div>
      </div>
      
      <div className="features-section">
        <h2>Recursos do Projeto</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🎮 Jogo Completo</h3>
            <p>Jogo da velha funcional com histórico de jogadas</p>
          </div>
          <div className="feature-card">
            <h3>📱 Responsivo</h3>
            <p>Interface adaptada para todos os dispositivos</p>
          </div>
          <div className="feature-card">
            <h3>⚡ React Moderno</h3>
            <p>Utilizando os hooks mais recentes do React</p>
          </div>
          <div className="feature-card">
            <h3>🛣️ Navegação</h3>
            <p>Sistema de rotas com React Router</p>
          </div>
        </div>
      </div>
    </div>
  );
} 