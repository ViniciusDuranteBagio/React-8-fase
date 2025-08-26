import {Link} from 'react-router-dom'

export default function Navigation(){
    const isActive = (path) =>{
        return location.pathname == path ? 'active' : '';
    }

    return(
        <nav className="navigation">
            <div className="nav-container">
                <div className="nav-brand">
                    <Link to="/" className="nav-logo">
                    Old Woman's Game
                    </Link>
                </div>
                <div className='nav-menu'>
                    <Link to="/" className={`nav-link ${isActive('/')}`}>Casa</Link>
                    <Link to="/game" className={`nav-link ${isActive('/game')}`}>O Jogo</Link>
                </div>
            </div>
        </nav>
    )
}