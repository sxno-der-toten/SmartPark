// src/pages/Profile.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, signup } = useAuth(); // on utilise signup pour mettre à jour les infos
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const handleValidate = () => {
    signup(formData); // met à jour les infos dans le contexte
    setEditMode(false);
    alert("Vos informations ont été mises à jour !");
  };

  return (
    <main className="container">
      <div className="card">
        <h2>Profil</h2>
        {user ? (
          <>
            {!editMode ? (
              <>
                <p><strong>Nom:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>ID:</strong> {user.id}</p>
                <button
                  className="btn-primary"
                  style={{ marginTop: "10px" }}
                  onClick={() => setEditMode(true)}
                >
                  Modifier mes informations
                </button>
              </>
            ) : (
              <div style={{ marginTop: "10px" }}>
                <input
                  type="text"
                  placeholder="Nom"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <button className="btn-success" onClick={handleValidate}>
                  Valider
                </button>
              </div>
            )}
          </>
        ) : (
          <p>Vous n'êtes pas connecté. Allez à la page Connexion.</p>
        )}
      </div>
    </main>
  );
}
