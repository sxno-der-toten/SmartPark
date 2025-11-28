// src/components/NavbarGuest.jsx
import { Link, useLocation } from "react-router-dom";

export default function NavbarGuest() {
  const loc = useLocation();

  return (
    <header className="navbar">
      <div className="brand">SmartPark</div>
      <nav>
        <Link className={loc.pathname === "/" ? "active" : ""} to="/">Accueil</Link>
        <Link className={loc.pathname === "/profile" ? "active" : ""} to="/profile">Profil</Link>
      </nav>
      <div className="auth">
        <Link to="/auth" className="btn-primary">Connexion</Link>
      </div>
    </header>
  );
}
