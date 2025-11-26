import Nav from './Navbar';
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Inscription from './inscription'

function Home() {
  return (
    <section id="accueil" className='accueil-section'>
      <h2>Bienvenue à SmartPark</h2>
      <p>Votre solution intelligente pour le stationnement.</p>
    </section>
  )
}

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inscription" element={<Inscription />} />
      </Routes>
    </>
  )
}

export default App
