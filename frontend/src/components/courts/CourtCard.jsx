import React from "react";
import StatusToggle from "./StatusToggle";
import { SquarePen, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { CourtDialog } from "./CourtDialog";
import "./CourtCard.css";

export default function CourtCard({
  court,
  onEdit,
  onDelete,
  onToggleStatus,
  editCourt,
  setEditCourt,
  errorMessage,
}) {
  const { courtNumber, pricePerHour, isAvailable } = court;

  const handleToggle = (nextState) => {
    onToggleStatus(court.id, nextState);
  };

  const handleDelete = () => {
    Swal.fire({
      title: `¿Estas seguro de eliminar cancha ${courtNumber}?`,
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      customClass: {
        popup: "my-swal-popup",
        confirmButton: "my-confirm-btn",
        cancelButton: "my-cancel-btn",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(court.id);
        Swal.fire({
          icon: "success",
          title: `Cancha ${court.courtNumber} fue eliminada exitosamente.`,
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="court-card">
      <div className="court-header">
        <h3>Cancha {courtNumber}</h3>
        <StatusToggle isActive={isAvailable} onToggle={handleToggle} />
      </div>
      <div className="court-row">
        <p
          className={`court-status ${
            isAvailable ? "available" : "unavailable"
          }`}
        >
          {isAvailable ? "Disponible" : "No disponible"}
        </p>

        <div className="court-info">
          <p>
            <strong>Precio/hora:</strong> ${pricePerHour}
          </p>
        </div>

        <div className="court-actions">
          <button className="edit-btn" onClick={() => setEditCourt(court)}>
            <SquarePen strokeWidth={1.5} />
          </button>
          <button className="delete-btn" onClick={handleDelete}>
            <Trash2 strokeWidth={1.5} />
          </button>
        </div>
      </div>
      {editCourt?.id === court.id && (
        <CourtDialog
          open={editCourt}
          onOpenChange={() => setEditCourt(null)}
          onSubmit={(newPrice) => onEdit(court.id, newPrice)}
          initialPrice={pricePerHour}
          courtNumber={courtNumber}
          sportName="Fútbol"
          mode="edit"
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
}
