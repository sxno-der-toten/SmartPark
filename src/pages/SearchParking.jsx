// src/pages/SearchParking.jsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useParking } from "../context/ParkingContext";

const orleansCenter = [47.9025, 1.9090]; // coordonnées d'Orléans

export default function SearchParking() {
  const { spots } = useParking();

  // Exemple : on attribue des coordonnées fictives aux places
  const spotsWithCoords = spots.map((s, i) => ({
    ...s,
    coords: [
      orleansCenter[0] + i * 0.002, // petit décalage latitude
      orleansCenter[1] + i * 0.002, // petit décalage longitude
    ],
  }));

  // Couleurs des icônes selon statut (Leaflet utilise des icônes personnalisées)
  const iconMap = {
    libre: new L.Icon({
      iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
      iconSize: [32, 32],
    }),
    occupée: new L.Icon({
      iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
      iconSize: [32, 32],
    }),
    indisponible: new L.Icon({
      iconUrl: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
      iconSize: [32, 32],
    }),
  };

  return (
    <main className="container">
      <h1>Parkings à Orléans (OpenStreetMap)</h1>
      <p>Visualisez toutes les places avec leur statut en temps réel.</p>

      <MapContainer
        center={orleansCenter}
        zoom={14}
        style={{ height: "500px", width: "100%", borderRadius: "12px" }}
      >
        {/* Fond de carte OpenStreetMap */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marqueurs des places */}
        {spotsWithCoords.map((spot) => (
          <Marker
            key={spot.id}
            position={spot.coords}
            icon={iconMap[spot.status]}
          >
            <Popup>
              <strong>Place {spot.id}</strong> <br />
              Niveau {spot.level} <br />
              Statut : {spot.status}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <section className="results">
        <h2>Liste des places :</h2>
        <ul>
          {spotsWithCoords.map((s) => (
            <li key={s.id}>
              <strong>Place {s.id}</strong> — Niveau {s.level} — Statut : {s.status}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
