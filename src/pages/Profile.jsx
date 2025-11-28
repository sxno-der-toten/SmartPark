// src/pages/Profile.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, signup } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
  });

  // Récupérer les infos de l'utilisateur depuis la BDD
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost/backend/profile.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
          }),
        });

        const data = await response.json();
        
        if (data.success && data.user) {
          setUserDetails(data.user);
          setFormData({
            nom: data.user.Nom || "",
            prenom: data.user.Prénom || "",
            email: data.user.Email || "",
          });
        } else {
          console.error("Erreur:", data.message);
          alert(data.message || "Erreur lors du chargement du profil");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du profil:", error);
        alert("Erreur lors du chargement du profil");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user?.email]);

  const handleValidate = async () => {
    // TODO: Ajouter un endpoint pour mettre à jour les infos dans la BDD
    // Pour l'instant, on met juste à jour localement
    signup({
      ...user,
      name: `${formData.prenom} ${formData.nom}`,
      email: formData.email,
    });
    
    setEditMode(false);
    alert("Vos informations ont été mises à jour !");
  };

  if (loading) {
    return (
      <main className="container">
        <div className="card">
          <p>Chargement du profil...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container">
      <div className="card">
        <h2>Profil</h2>
        {user && userDetails ? (
          <>
            {!editMode ? (
              <>
                <p><strong>Nom:</strong> {userDetails.Nom}</p>
                <p><strong>Prénom:</strong> {userDetails.Prénom}</p>
                <p><strong>Email:</strong> {userDetails.Email}</p>
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
                  value={formData.nom}
                  onChange={(e) =>
                    setFormData({ ...formData, nom: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Prénom"
                  value={formData.prenom}
                  onChange={(e) =>
                    setFormData({ ...formData, prenom: e.target.value })
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
                <button 
                  className="btn-secondary" 
                  onClick={() => setEditMode(false)}
                  style={{ marginLeft: "10px" }}
                >
                  Annuler
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