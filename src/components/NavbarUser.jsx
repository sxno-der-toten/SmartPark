// src/components/NavbarUser.jsx
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const loc = useLocation();

  return (
    <header className="navbar">
      <div className="brand">SmartPark</div>
      <nav>
        <Link className={loc.pathname === "/" ? "active" : ""} to="/">Accueil</Link>
        <Link className={loc.pathname === "/reports" ? "active" : ""} to="/reports">Signalements</Link>
        <Link className={loc.pathname === "/profile" ? "active" : ""} to="/profile">Profil</Link>
      </nav>
      <div className="auth">
        {user ? (
          <>
            <span className="welcome">Bonjour, {user.name}</span>
            <button onClick={logout} className="btn-outlined">Déconnexion</button>
          </>
        ) : (
          <Link to="/auth" className="btn-primary">Connexion</Link>
        )}
      </div>
    </header>
  );
}
