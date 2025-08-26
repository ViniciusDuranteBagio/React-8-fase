import '../styles.css'
import {Link, useLocation} from 'react-router-dom'

export default function Navigation(){
    return(
        <nav className='navigation'>
            <div className='nav-container'>
                <div className='nav-brand'>
                    <Link to="/game" className='nav-logo'>
                        Jogar 
                    </Link>
                        <br />
                    <Link to="/" className='nav-logo'>
                        Jogo da velha
                    </Link>
                </div>
            </div>
        </nav>
    )
}