import { Link, useLocation } from 'react-router-dom'

export default function Navigation() {
    return (
        <nav className='navegation'>
            <div className='nav-conteiner'>
                <div className='nav-brand'>
                    <Link to={'/game'}>Play</Link>
                    <br />
                    <Link to={'/'}>Home</Link>
                </div>
            </div>
        </nav>
    );
}