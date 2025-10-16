import { useState } from "react";
import { X } from "lucide-react";
import "./AddCourtDialog.css";

export const AddCourtDialog = ({ open, onOpenChange, onAddCourt, sportName }) => {
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (price) {
      onAddCourt(price);
      setPrice("");
      onOpenChange(false);
    }
  };

  if (!open) return null;

  return (
    <div className="dialog-overlay" onClick={() => onOpenChange(false)}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h2 className="dialog-title">Añadir cancha - {sportName}</h2>
          <button className="dialog-close" onClick={() => onOpenChange(false)}>
            <X className="icon-small" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="dialog-form">
          <div className="form-group">
            <label htmlFor="price" className="form-label">Precio por hora</label>
            <input
              id="price"
              type="number"
              className="form-input"
              placeholder="Ingrese el precio"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="dialog-footer">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </button>
            <button type="submit" className="btn-submit">
              Agregar cancha
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
