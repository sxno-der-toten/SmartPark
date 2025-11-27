// src/context/ParkingContext.jsx
import { createContext, useContext, useState, useMemo } from "react";

const ParkingContext = createContext(null);

// Statuts: "libre", "occupée", "indisponible"
const initialSpots = [
  { id: "A1", status: "libre", level: 1, sensorOk: true },
  { id: "A2", status: "occupée", level: 1, sensorOk: true },
  { id: "B1", status: "indisponible", level: 2, sensorOk: false },
  { id: "B2", status: "libre", level: 2, sensorOk: true },
];

export function ParkingProvider({ children }) {
  const [spots, setSpots] = useState(initialSpots);

  const updateStatus = (id, status) =>
    setSpots((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));

  const toggleSensor = (id) =>
    setSpots((prev) =>
      prev.map((s) => (s.id === id ? { ...s, sensorOk: !s.sensorOk } : s))
    );

  const stats = useMemo(() => {
    const total = spots.length;
    const libres = spots.filter((s) => s.status === "libre").length;
    const occupees = spots.filter((s) => s.status === "occupée").length;
    const indispo = spots.filter((s) => s.status === "indisponible").length;
    return { total, libres, occupees, indispo };
  }, [spots]);

  return (
    <ParkingContext.Provider
      value={{ spots, updateStatus, toggleSensor, stats }}
    >
      {children}
    </ParkingContext.Provider>
  );
}

export const useParking = () => useContext(ParkingContext);
