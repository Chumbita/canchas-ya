import "./CourtList.css";
import CourtCard from "./CourtCard";
import { useState } from "react";
import { AddCourtDialog } from "./AddCourtDialog";

export default function CourtList({ courts, onToggleStatus, onDelete }) {
    const [dialogOpen, setDialogOpen] = useState(false);
  if (courts.length === 0) return <p>No hay canchas registradassssssss.</p>;
  return (
    <div className="court-list">
      <div className="court-header">
        <h2>Canchas</h2>
        <button className="btn-add-court" onClick={() => setDialogOpen(true)}>
          Añadir cancha
        </button>
      </div>

      <div className="court-grid">
        {courts.length > 0 ? (
          courts.map((court) => (
            <CourtCard
              key={court.id}
              court={court}
              onToggleStatus={onToggleStatus}
              onDelete={onDelete}
            />
          ))
        ) : (
          <p className="no-courts">No hay canchas registradas.</p>
        )}
      </div>
      <AddCourtDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onAddCourt={(price) => {
          console.log("Nueva cancha:", price);
        }}
        sportName="Fulbo"
      />
    </div>
  );
}
