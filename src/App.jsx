import logo from './assets/logo.png';
import './App.css'

function App() {
  return (
    <>
      <div className='navbar'>
        <img src={logo} alt="Logo" className='logo' />
        <h1 className='title'>SmartPark</h1>

        <a href="#accueil" className='nav-link'>Accueil</a>
        <a href="#inscription" className='nav-link'>S'inscrire</a>
        <a href="#connexion" className='nav-link'>Se connecter</a>

      </div>




    </>
  )
}

export default App
