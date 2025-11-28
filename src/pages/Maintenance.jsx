// src/pages/Maintenance.jsx
import { useParking } from "../context/ParkingContext";
import "../assets/styles/maintenance.css";

export default function Maintenance() {
  const { spots, toggleSensor } = useParking();

  // Détermine la couleur de la carte
  const getCardColor = (sensorOk) => {
    return sensorOk ? "green" : "orange-dark"; // vert si OK, orange foncé si défaillant
  };

  return (
    <main className="container">
      <h2>Maintenance des capteurs</h2>
      <div className="cards-grid">
        {spots.map((s) => {
          const color = getCardColor(s.sensorOk);
          return (
            <div key={s.id} className={`card-maintenance ${color}`}>
              {/* Affiche le nom du parking si présent, sinon l'id */}
              <h4>{s.nomParking ?? s.id}</h4>

              <p><strong>Capteur :</strong> {s.sensorOk ? "OK" : "Défaillant"}</p>

              {/* Date réparation si capteur défaillant */}
              {!s.sensorOk && s.dateReparation && (
                <p><strong>Date réparation :</strong> {s.dateReparation}</p>
              )}

              <p><strong>Technicien ID :</strong> {s.technicienId ?? "N/A"}</p>

              <small className="mini-desc">
                {s.sensorOk
                  ? "Capteur opérationnel, aucune intervention nécessaire."
                  : "Capteur en panne, intervention prévue."}
              </small>

              <button
                className="btn-outlined"
                onClick={() => toggleSensor(s.id)}
              >
                Basculer l'état du capteur
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}
