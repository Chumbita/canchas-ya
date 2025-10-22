import { useEffect, useState } from "react";
import "./CourtDialog.css";
//import "./AddCourtDialog.css";

export const CourtDialog = ({
  open,
  onOpenChange,
  onSubmit,
  sportName,
  initialPrice = "",
  courtNumber,
  errorMessage,
  mode = "add", // "add" o "edit"
}) => {
  const [price, setPrice] = useState(initialPrice);

  useEffect(() => {
    setPrice(initialPrice);
  }, [initialPrice]);

  useEffect(() => {
    if (!open) {
      setPrice("");
    }
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (price) {
      const parsedPrice = parseFloat(price);
      onSubmit(parsedPrice);
    }
  };
  const handleClose = () => {
    setPrice("");
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="dialog-overlay" onClick={() => onOpenChange(false)}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h2 className="dialog-title">
            {mode === "edit" ? `Editar cancha ${courtNumber}` : "Añadir cancha"}{" "}
            – {sportName}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="dialog-form">
          <div className="form-group price-group">
            <label htmlFor="price" className="form-label">
              Precio por hora
            </label>
            <div className="price-input-wrapper">
              <span className="currency-symbol">$</span>
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
          </div>

          {errorMessage && <div className="error-message"> {errorMessage}</div>}
          <div className="dialog-footer">
            <button type="button" className="btn-cancel" onClick={handleClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-submit">
              {mode === "edit" ? "Guardar Cambios" : "Agregar cancha"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
