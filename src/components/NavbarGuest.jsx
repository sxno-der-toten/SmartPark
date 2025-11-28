// src/components/NavbarGuest.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function NavbarGuest() {
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
          className={loc.pathname === "/profile" ? "active" : ""}
          to="/profile"
          onClick={closeMenu}
        >
          Profil
        </Link>

        <Link to="/auth" className="btn-primary" onClick={closeMenu}>
          Connexion
        </Link>
      </nav>
    </header>
  );
}
