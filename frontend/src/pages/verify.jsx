import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
//ESTO ERA PARA VER QUE ONDA LO OTRO SE BORRA
export default function VerifyCode() {
  const { state } = useLocation();
  const email = state?.email || "tu correo";
  const [code, setCode] = useState(["", "", "", ""]);
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
    }
  };

  const handleSubmit = () => {
    const fullCode = code.join("");
    if (fullCode.length === 4) {
      console.log("Código ingresado:", fullCode);
      // Aquí iría la lógica de verificación
    }
  };

  return (
    <div className="box">
      <h3>
        Ingresa el código de 4 dígitos que se te envió a:{" "}
        <strong>{email}</strong>
      </h3>

      <div style={{ display: "flex", gap: "10px", margin: "20px 0" }}>
        {code.map((digit, i) => (
          <input
            key={i}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e.target.value, i)}
            style={{
              width: "50px",
              height: "50px",
              textAlign: "center",
              fontSize: "20px",
            }}
          />
        ))}
      </div>

      <p className="sub">
        Consejo: Asegúrate de revisar la bandeja de entrada y la carpeta de
        correo no deseado.
      </p>

      <button className="btn" onClick={handleSubmit}>
        Continuar
      </button>
    </div>
  );
}
