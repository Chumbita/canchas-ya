import "./CourtList.css";
import CourtCard from "./CourtCard";
import { CourtDialog } from "./CourtDialog";

export default function CourtList({
  courts,
  onToggleStatus,
  onAdd,
  onEdit,
  onDelete,
  errorMessage,
  addDialogOpen,
  setAddDialogOpen,
  editCourt,
  setEditCourt,
}) {
  return (
    <div className="court-list">
      <div className="court-header">
        <h2>Canchas</h2>
        <button className="btn-add-court" onClick={() => setAddDialogOpen(true)}>
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
              onEdit={onEdit}
              onDelete={onDelete}
              editCourt={editCourt}
              setEditCourt={setEditCourt}
              errorMessage={errorMessage}
            />
          ))
        ) : (
          <p className="no-courts">No hay canchas registradas.</p>
        )}
      </div>
      <CourtDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSubmit={(price) => {
          onAdd(price);
          console.log("Nueva cancha:", price);
        }}
        sportName="Futbol" // luego extraer del contexto
        errorMessage={errorMessage}
        mode="add"
      />
    </div>
  );
}
