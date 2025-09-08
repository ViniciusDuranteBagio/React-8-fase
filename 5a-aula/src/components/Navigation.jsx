import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/" className="nav-logo">
            🎮 Jogo da Velha
          </Link>
        </div>
        
        <div className="nav-menu">
          <Link to="/" className={`nav-link ${isActive('/')}`}>
            Início
          </Link>
          <Link to="/game" className={`nav-link ${isActive('/game')}`}>
            Jogar
          </Link>
          <Link to="/about" className={`nav-link ${isActive('/about')}`}>
            Sobre
          </Link>
        </div>

        <div className="nav-mobile-toggle">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
} 