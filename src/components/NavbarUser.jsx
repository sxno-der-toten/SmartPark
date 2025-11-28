// src/components/NavbarUser.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../assets/styles/Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const loc = useLocation();
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="brand">SmartPark</div>

      <button className="navbar-toggle" onClick={toggleMenu}>
        ☰
      </button>

      <nav className={`navbar-links ${open ? "active" : ""}`}>
        <Link
          className={loc.pathname === "/" ? "active" : ""}
          to="/"
          onClick={closeMenu}
        >
          Accueil
        </Link>
        <Link
          className={loc.pathname === "/reports" ? "active" : ""}
          to="/reports"
          onClick={closeMenu}
        >
          Signalements
        </Link>
        <Link
          className={loc.pathname === "/profile" ? "active" : ""}
          to="/profile"
          onClick={closeMenu}
        >
          Profil
        </Link>

        {user ? (
          <div className="auth">
            <span className="welcome">Bonjour, {user.name}</span>
            <button
              onClick={() => {
                logout();
                closeMenu();
              }}
              className="btn-outlined"
            >
              Déconnexion
            </button>
          </div>
        ) : (
          <Link to="/auth" className="btn-primary" onClick={closeMenu}>
            Connexion
          </Link>
        )}
      </nav>
    </header>
  );
}
