// src/pages/Reports.jsx
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const orleansCenter = [47.9025, 1.9090];

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [parkings, setParkings] = useState([]);
  const [selectedParking, setSelectedParking] = useState("");
  const [problem, setProblem] = useState("");

  useEffect(() => {
    fetch("/backend/parkings.php")
      .then((r) => r.json())
      .then((data) => {
        setParkings(data);
      })
      .catch((err) => console.error("Erreur:", err));
  }, []);

  const iconParking = new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/orange-dot.png",
    iconSize: [32, 32],
  });

  const handleAddReport = () => {
    if (!selectedParking || !problem.trim()) {
      alert("Veuillez choisir un parking et préciser le problème.");
      return;
    }

    const parking = parkings.find((p) => p.nom === selectedParking);
    if (!parking) return;

    const newReport = {
      id: Date.now(),
      lieu: parking.nom,
      parkingId: parking.id || parking.nom,
      type: "parking",
      description: problem,
      coords: [parking.lat, parking.lon],
    };

    setReports([...reports, newReport]);
    setSelectedParking("");
    setProblem("");
  };

  

  const handleDelete = (id) => {
    setReports(reports.filter((r) => r.id !== id));
  };

  return (
    <main className="container">
      <h1></h1>

      {/* Formulaire signaler un problème */}
      <section className="card">
        <h2>Signaler un problème</h2>
        <div className="flex-row">
          <select
            value={selectedParking}
            onChange={(e) => setSelectedParking(e.target.value)}
          >
            <option value="">-- Choisir un parking --</option>
            {parkings.map((p, i) => (
              <option key={i} value={p.nom}>
                {p.nom}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Préciser le problème (ex: Parking indisponible)"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
          />

          <button className="btn-primary" onClick={handleAddReport}>
            🚨 Signaler le problème
          </button>
        </div>
      </section>

      {/* Partie mes signalements */}
      <section className="card">
        <h2>Mes signalements</h2>
        {reports.length === 0 ? (
          <p>Aucun signalement pour l'instant.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {reports.map((r) => (
              <li
                key={r.id}
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>
                  <strong>{r.lieu}</strong> — Parking {r.parkingId} —{" "}
                  {r.description}
                </span>
                <button
                  className="btn-danger"
                  onClick={() => handleDelete(r.id)}
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Carte OpenStreetMap avec les signalements */}
      <section>
        <h2>Carte des signalements</h2>
        <MapContainer
          center={orleansCenter}
          zoom={14}
          style={{ height: "400px", width: "100%", borderRadius: "12px" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {reports.map((r) => (
            <Marker key={r.id} position={r.coords} icon={iconParking}>
              <Popup>
                <strong>{r.lieu}</strong> <br />
                Parking {r.parkingId} <br />
                {r.description}
                <br />
                <button className="btn-danger" onClick={() => handleDelete(r.id)}>
                  Supprimer
                </button>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </section>
    </main>
  );
}
