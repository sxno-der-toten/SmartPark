import useParkings from "../hooks/useParkings";

export default function Parkings() {
  const { parkings, loading } = useParkings();

  if (loading) return <p>Chargement des données...</p>;

  return (
    <main className="container">
      <h1>Liste des parkings</h1>
      <ul>
        {parkings.map((p, i) => (
          <li key={i}>
            <strong>{p.nom}</strong> — {p.nb_places_libres}/{p.nb_places} libres
            <br />
            Position : {p.lat}, {p.lon}
          </li>
        ))}
      </ul>
    </main>
  );
}
