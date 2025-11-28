// src/pages/Home.jsx
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Pin images (resolvable by Vite)
import pinNoir from "../assets/pins/Pin_noir.png";
import pinRouge from "../assets/pins/Pin_rouge.png";
import pinVert from "../assets/pins/Pin_vert.png";
import pinJaune from "../assets/pins/Pin_jaune.png";

export default function Home() {
  const [parkings, setParkings] = useState([]);
  const [map, setMap] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [selectedParkingName, setSelectedParkingName] = useState(""); // ⚠️ chaîne (nom)

  useEffect(() => {
    const m = L.map("map").setView([47.9025, 1.909], 13);
    setMap(m);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(m);

    fetch("http://127.0.0.1:80/backend/parkings.php")
      .then((r) => r.json())
      .then((data) => {
        setParkings(data);

        data.forEach((p) => {
          console.log(p)
          if (!p.lat || !p.lon) return;

          let iconUrl;
          if (p.nb_places_libres == null) {
            iconUrl = pinNoir;
          } else if (p.nb_places_libres == 0) {
            iconUrl = pinRouge;
          } else {
            const taux = (p.nb_places_libres / p.nb_places) * 100;
            iconUrl = taux > 20 ? pinVert : pinJaune;
          }

          const icon = L.icon({
            iconUrl,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
          });

          L.marker([p.lat, p.lon], { icon })
            .addTo(m)
            .bindPopup(`
              <b>${p.nom}</b><br>
              Places : ${p.nb_places}<br>
              Libres : ${p.nb_places_libres ?? "Indisponible"}
            `);
        });
      })
      // .catch((err) => console.error("Erreur:", err));

    return () => {
      m.remove();
    };
  }, []);

  // Optionnel: conserver un seul marker de recherche
  const [searchMarker, setSearchMarker] = useState(null);

  const handleSearch = () => {
    if (!map) return;

    // 1) Priorité: parking choisi dans la liste (match exact du nom)
    let found =
      selectedParkingName
        ? parkings.find((p) => p.nom === selectedParkingName)
        : null;

    // 2) Sinon: recherche par texte (match partiel, insensible à la casse)
    if (!found && searchName.trim()) {
      found = parkings.find((p) =>
        p.nom.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (found) {
      map.setView([found.lat, found.lon], 16);

      // Supprimer l'ancien marker de recherche si présent
      if (searchMarker) {
        map.removeLayer(searchMarker);
      }

      const marker = L.marker([found.lat, found.lon])
        .addTo(map)
        .bindPopup(`
          <b>${found.nom}</b><br>
          Places : ${found.nb_places}<br>
          Libres : ${found.nb_places_libres ?? "Indisponible"}
        `)
        .openPopup();

      setSearchMarker(marker);
    } else {
      alert("Parking non trouvé !");
    }
  };

  return (
    <main className="container">
      <h2>Parkings en direct</h2>
      <div id="map" style={{ height: "500px", width: "100%", position: "relative", zIndex: 1 }}></div>

      {/* Zone de recherche */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Entrer le nom du parking"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          style={{
            padding: "8px",
            marginRight: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <select
          value={selectedParkingName}
          onChange={(e) => setSelectedParkingName(e.target.value)}
          style={{
            padding: "8px",
            marginRight: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">-- Choisir un parking --</option>
          {parkings.map((p, i) => (
            <option key={i} value={p.nom}>
              {p.nom}
            </option>
          ))}
        </select>

        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          🔍 Rechercher
        </button>
      </div>
    </main>
  );
}
