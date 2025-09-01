import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className='navigation'>
      <div className='nav-container'>
        <div className='nav-brand'>
          <Link to={'/game'}>Play</Link>
          <br />
          <Link to={'/'}>Home</Link>
          <Link to='/' className='nav-logo'>
            🎮 Jogo da Velha
          </Link>
          <Link to='/about' className='nav-logo'>
            📖 Sobre
          </Link>
        </div>
      </div>
    </nav>
  );
}