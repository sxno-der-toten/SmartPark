// src/components/NavbarSwitch.jsx
import { useAuth } from "../context/AuthContext";
import "../assets/styles/Navbar.css";
import NavbarUser from "./NavbarUser";
import NavbarGuest from "./NavbarGuest";
import { useState, useEffect } from "react";

export default function NavbarSwitch() {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
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
          setUserRole(data.user.Id_Rôle);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du rôle:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user?.email]);

  if (loading) {
    return null;
  }

  // Si pas connecté, afficher NavbarGuest
  if (!user) {
    return <NavbarGuest />;
  }

  // Rôle 1 = Admin, afficher Navbar.jsx
  // Rôle 2 = Utilisateur, afficher NavbarUser.jsx
  return userRole === 1 ? <Navbar /> : <NavbarUser />;
}
