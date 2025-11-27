// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signup = async (formData) => {
    const res = await fetch("http://localhost/backend/signup.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const text = await res.text();
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch (e) {
      throw new Error(
        `Backend returned non-JSON response (status ${res.status}): ${text.substring(0, 500)}`
      );
    }

    if (!res.ok) throw new Error(data.message || `Erreur ${res.status}`);

    setUser(data.user);
    return data.user;
  };

  const login = async (credentials) => {
    const res = await fetch("http://localhost/backend/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const text = await res.text();
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch (e) {
      throw new Error(
        `Backend returned non-JSON response (status ${res.status}): ${text.substring(0, 500)}`
      );
    }

    if (!res.ok) throw new Error(data.message || `Erreur ${res.status}`);

    setUser(data.user);
    return data.user;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
