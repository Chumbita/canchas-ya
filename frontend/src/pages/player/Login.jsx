import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import googleIcon from "../assets/icons/google-icon.png";
import facebookIcon from "../assets/icons/facebook-icon.png";
import "../styles/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("El correo es obligatorio");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Ingresa un correo válido");
    } else {
      setError("");
      navigate("/verify", { state: { email } });
    }
  };

  return (
    <div className="login-box">
      <h2 className="login-title">Sacar turno nunca fue tan fácil</h2>
      <p className="login-sub">
        Reservá tu cancha en segundos. Sin esperas, sin complicaciones.
      </p>

      <form onSubmit={handleSubmit}>
        <label className="login-label">Ingresa tu correo electrónico</label>
        <input
          type="email"
          className="login-input"
          placeholder="Ej: example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <p className="login-error">{error}</p>}

        <button type="submit" className="login-btn">
          Continuar
        </button>
      </form>

      {/* Divisor */}
      <div className="login-divider">
        <hr />
        <span>o</span>
        <hr />
      </div>

      {/* Botones sociales */}
      <button className="social-btn google-btn">
        <img src={googleIcon} alt="Google" className="social-icon" />
        Continuar con Google
      </button>
      <button className="social-btn facebook-btn">
        <img src={facebookIcon} alt="Facebook" className="social-icon" />
        Continuar con Facebook
      </button>
    </div>
  );
}
