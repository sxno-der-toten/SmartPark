// src/pages/Maintenance.jsx
import { useParking } from "../context/ParkingContext";

export default function Maintenance() {
  const { spots, toggleSensor } = useParking();

  return (
    <main className="container">
      <h2>Maintenance des capteurs</h2>
      <div className="grid">
        {spots.map((s) => (
          <div key={s.id} className="card">
            <h4>Place {s.id}</h4>
            <p><strong>Niveau:</strong> {s.level}</p>
            <p><strong>Capteur:</strong> {s.sensorOk ? "OK" : "Défaillant"}</p>
            <button className="btn-outlined" onClick={() => toggleSensor(s.id)}>
              Basculer l'état du capteur
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
