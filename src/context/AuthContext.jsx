// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Initialiser avec les données du localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("smartpark_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    if (user) {
      localStorage.setItem("smartpark_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("smartpark_user");
    }
  }, [user]);

  const login = async ({ email, password }) => {
    try {
      const response = await fetch("http://localhost/backend/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        const userData = {
          id: data.user.Id_Utilisateur,
          name: `${data.user.Prénom} ${data.user.Nom}`,
          email: data.user.Email,
          role: data.user.Id_Rôle,
        };
        setUser(userData);
        return userData;
      } else {
        throw new Error(data.message || "Identifiants incorrects");
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      throw error;
    }
  };

  const signup = async ({ nom, prenom, email, password }) => {
    try {
      const response = await fetch("http://localhost/backend/signup.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nom, prenom, email, password }),
      });

      const data = await response.json();

      if (data.success) {
        const userData = {
          id: data.user.Id_Utilisateur,
          name: `${prenom} ${nom}`,
          email: email,
          role: data.user.Id_Rôle || 2,
        };
        setUser(userData);
        return userData;
      } else {
        throw new Error(data.message || "Erreur lors de l'inscription");
      }
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("smartpark_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}