import logo from './assets/logo.png';
import burger from './assets/burger.svg';
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <>
        <section className='navbar'>
            <div className='gauche'>
                <img src={logo} alt="Logo" className='logo' />
                <h1 className='title'>SmartPark</h1>
            </div>
            <div className='right'>
                <Link to="/" className='nav-link'>Accueil</Link>
                <Link to="/inscription" className='nav-link'>S'inscrire</Link>
                <Link to="/connexion" className='nav-link'>Se connecter</Link>
            </div>
            <div className="burger-dropdown">
                <button className="burger-btn"><img src={burger} className="burger-icon" alt="Burger menu" /></button>
                <div className="dropdown-content">
                    <Link to="/" className='nav-link'>Accueil</Link>
                    <Link to="/inscription" className='nav-link'>S'inscrire</Link>
                    <Link to="/connexion" className='nav-link'>Se connecter</Link>
                </div>
            </div>
        </section>
        </>
            );
}

export default Nav;
