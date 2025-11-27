// src/pages/Auth.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Auth() {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const { login, signup } = useAuth();
  const [form, setForm] = useState({ nom: "", prenom: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "login") {
        await login({ email: form.email, password: form.password });
      } else {
        await signup({ nom: form.nom, prenom: form.prenom, email: form.email, password: form.password });
      }
    } catch (err) {
      console.error("Auth error:", err);
      // show a simple alert for now; the UI can be improved later
      alert(err.message || "Erreur d'authentification");
    }
  };

  return (
    <main className="auth-container">
      <div className={`auth-card ${mode}`}>
        <div className="tabs">
          <button
            className={mode === "login" ? "active" : ""}
            onClick={() => setMode("login")}
          >
            Connexion
          </button>
          <button
            className={mode === "signup" ? "active" : ""}
            onClick={() => setMode("signup")}
          >
            Inscription
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === "signup" && (
              <>
                <div className="field">
                  <label>Nom</label>
                  <input
                    type="text"
                    placeholder="Votre nom"
                    value={form.nom}
                    onChange={(e) => setForm({ ...form, nom: e.target.value })}
                    required
                  />
                </div>

                <div className="field">
                  <label>Prénom</label>
                  <input
                    type="text"
                    placeholder="Votre prénom"
                    value={form.prenom}
                    onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                    required
                  />
                </div>
              </>
            )}
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              placeholder="exemple@mail.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="field">
            <label>Mot de passe</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn-primary">
            {mode === "login" ? "Se connecter" : "Créer un compte"}
          </button>
        </form>

        <div className="transition-tip">
          {mode === "login"
            ? "Pas de compte ? Inscrivez-vous pour garder vos réservations."
            : "Déjà inscrit ? Connectez-vous pour retrouver vos places."}
        </div>
      </div>
    </main>
  );
}
