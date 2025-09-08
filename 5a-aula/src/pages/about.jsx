import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="about-page">
      <h1>Sobre o Projeto</h1>
      
      <div className="about-content">
        <section className="about-section">
          <h2>🎯 Objetivo Educacional</h2>
          <p>
            Este projeto foi desenvolvido como um tutorial prático para ensinar os conceitos fundamentais do React,
            incluindo componentes, estado, props e hooks. É perfeito para estudantes que estão começando
            sua jornada no desenvolvimento frontend.
          </p>
        </section>

        <section className="about-section">
          <h2>⚛️ Conceitos React Aplicados</h2>
          <div className="concepts-grid">
            <div className="concept-card">
              <h3>Componentes</h3>
              <p>Separação de responsabilidades com componentes reutilizáveis</p>
            </div>
            <div className="concept-card">
              <h3>Estado (State)</h3>
              <p>Gerenciamento de dados dinâmicos com useState</p>
            </div>
            <div className="concept-card">
              <h3>Props</h3>
              <p>Passagem de dados entre componentes</p>
            </div>
            <div className="concept-card">
              <h3>Eventos</h3>
              <p>Interação do usuário com handlers de eventos</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>🛠️ Tecnologias Utilizadas</h2>
          <ul className="tech-list">
            <li><strong>React 19</strong> - Biblioteca principal para interface</li>
            <li><strong>React Router 7</strong> - Sistema de navegação</li>
            <li><strong>CSS Responsivo</strong> - Design adaptável</li>
            <li><strong>Hooks</strong> - useState para gerenciamento de estado</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>📚 Como Usar Este Tutorial</h2>
          <ol className="tutorial-steps">
            <li>Explore a página inicial para entender a estrutura</li>
            <li>Jogue algumas partidas para ver o jogo em ação</li>
            <li>Analise o código fonte para entender a implementação</li>
            <li>Experimente modificando o código para aprender</li>
          </ol>
        </section>

        <div className="about-actions">
          <Link to="/game" className="btn btn-primary">
            Experimentar o Jogo
          </Link>
          <Link to="/" className="btn btn-secondary">
            Voltar ao Início
          </Link>
        </div>
      </div>
    </div>
  );
} 