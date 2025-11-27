// // src/pages/AdminHome.jsx
// import Map from "../components/Map";
// import { useParking } from "../context/ParkingContext";
// import ParkingSpotCard from "../components/ParkingSpotCard";

// export default function AdminHome() {
//   const { spots, updateStatus, stats } = useParking();

//   // calcul des pourcentages
//   const percent = {
//     libres: ((stats.libres / stats.total) * 100).toFixed(1),
//     occupees: ((stats.occupees / stats.total) * 100).toFixed(1),
//     indispo: ((stats.indispo / stats.total) * 100).toFixed(1),
//   };

//   return (
//     <main className="container">
//       <section className="hero">
//         <div className="hero-content">
//           <h1>Tableau de bord Admin</h1>
//           <p>Suivi des places en temps réel et gestion des statuts.</p>
//         </div>
//         <Map />
//       </section>

//       <section className="stats">
//         <div className="stat-card success">
//           <strong>Libres:</strong> {stats.libres} ({percent.libres}%)
//         </div>
//         <div className="stat-card danger">
//           <strong>Occupées:</strong> {stats.occupees} ({percent.occupees}%)
//         </div>
//         <div className="stat-card warning">
//           <strong>Indispo:</strong> {stats.indispo} ({percent.indispo}%)
//         </div>
//       </section>

//       <section className="grid">
//         {spots.map((spot) => (
//           <ParkingSpotCard
//             key={spot.id}
//             spot={spot}
//             onReserve={null} // pas de réservation
//             onChangeStatus={updateStatus} // admin peut modifier
//             hideReserveButton={true}
//           />
//         ))}
//       </section>
//     </main>
//   );
// }

// role selon utilisateur 

// src/pages/AdminHome.jsx
import { useParking } from "../context/ParkingContext";

export default function AdminHome() {
  const { stats, updateStatus } = useParking();

  return (
    <main className="container">
      <h1>Accueil Admin</h1>
      <p>Nombre de places occupées : {stats.occupees}</p>
      <p>Nombre total de places : {stats.total}</p>

      <button onClick={() => updateStatus("A1", "libre")}>
        Libérer la place A1
      </button>

      <section>
        <h2>Vision globale des signalements</h2>
        {/* Ici tu peux réutiliser ton composant Reports avec tous les signalements */}
      </section>

      <section>
        <h2>Maintenance</h2>
        <p>Accès à la page maintenance</p>
      </section>
    </main>
  );
}
  