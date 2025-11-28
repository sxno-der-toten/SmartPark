// src/pages/Profile.jsx
import { useState, useEffect } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", id: "" });

  // 🔹 Récupérer l'ID utilisateur depuis localStorage
  const userId = localStorage.getItem("user_id");

  // 🔹 Charger les infos utilisateur depuis get_profile.php
  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost/backend/parking_app/get_profile.php?user_id=${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUser(data.user);
          setFormData({
            name: data.user.name,
            email: data.user.email,
            id: data.user.id
          });
        } else {
          alert(data.message);
        }
      })
      .catch(err => console.error("Erreur chargement profil:", err));
  }, [userId]);

  // 🔹 Mettre à jour le profil via update_profile.php
  const handleValidate = async () => {
    try {
      const res = await fetch("http://localhost/backend/parking_app/update_profile.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        alert("Profil mis à jour !");
        setUser({ ...user, ...formData });
        setEditMode(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Erreur mise à jour profil:", error);
      alert("Impossible de mettre à jour le profil.");
    }
  };

  return (
    <main className="container">
      <div className="card">
        <h2>Profil</h2>
        {formData.id ? (
          <>
            {!editMode ? (
              <>
                <p><strong>Nom:</strong> {formData.name}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>ID:</strong> {formData.id}</p>
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
