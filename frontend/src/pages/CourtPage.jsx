import "./CourtPage.css";
import { useEffect, useState } from "react";
import CourtList from "../components/courts/CourtList";
import {
  getCourts,
  postCourt,
  putCourt,
  deleteCourt,
} from "../services/courtsService";

export default function CourtPage() {
  const [courts, setCourts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editCourt, setEditCourt] = useState(null);

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

  const handleAddCourt = async (pricePerHour) => {
    try {
      const newCourt = await postCourt(idSportClub, pricePerHour);
      setCourts((prevCourts) => [...prevCourts, newCourt]);
      setErrorMessage("");
      setAddDialogOpen(false);
    } catch (error) {
      console.error("Error al añadir cancha: ", error.message);
      setErrorMessage(error.message);
    }
  };

  const handleToggleStatus = async (courtId, nextState) => {
    try {
      const updateCourt = await putCourt(courtId, { isAvailable: nextState });
      setCourts((prev) =>
        prev.map((court) => (court.id === courtId ? updateCourt : court))
      );
    } catch (error) {
      console.error("Error al actualizar disponibilidad: ", error.message);
    }
  };

  const handleEditCourt = async (courtId, price) => {
    try {
      const updateCourt = await putCourt(courtId, { pricePerHour: price });
      setCourts((prev) =>
        prev.map((court) => (court.id === courtId ? updateCourt : court))
      );
      setErrorMessage("");
      setEditCourt(null);
    } catch (error) {
      console.error("Error al actualizar disponibilidad: ", error.message);
      setErrorMessage(error.message);
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
        onAdd={handleAddCourt}
        onEdit={handleEditCourt}
        onDelete={handleDeleteCourt}
        errorMessage={errorMessage}
        addDialogOpen={addDialogOpen}
        setAddDialogOpen={setAddDialogOpen}
        editCourt={editCourt}
        setEditCourt={setEditCourt}
      />
    </div>
  );
}
