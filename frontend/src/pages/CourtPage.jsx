import "./CourtPage.css";
import { useEffect, useState } from "react";
import CourtList from "../components/courts/CourtList";
import { getCourts, putCourt, deleteCourt } from "../services/courtsService";

export default function CourtPage() {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);

  const idSportClub = 2;

  useEffect(() => {
    loadCourts();
  }, []);

  async function loadCourts() {
    setLoading(true);
    try {
      const data = await getCourts(idSportClub);
      setCourts(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleToggleStatus = async (courtId, nextState) => {
    try {
      const updateCourt = await putCourt(courtId, { isAvailable: nextState });
      console.log(courtId, nextState); // Borrar luego
      setCourts((prev) =>
        prev.map((court) => (court.id === courtId ? updateCourt : court))
      );
    } catch (error) {
      console.error("Error al actualizar disponibilidad: ", error.message);
    }
  };

  const handleDeleteCourt = async (courtId) => {
    try {
      const result = await deleteCourt(courtId);
      console.log(result.message); // "Cancha eliminada"
      setCourts((prev) => prev.filter((court) => court.id !== courtId));
    } catch (error) {
      console.error("Error al eliminar cancha:", error.message);
    }
  };

  if (loading) return <p>Cargando canchas...</p>;

  return (
    <div className="court-page">
      <h1>Gestión de Canchas</h1>
      <CourtList
        courts={courts}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDeleteCourt}
      />
    </div>
  );
}
