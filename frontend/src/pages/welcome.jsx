import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/welcome.css";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome">
      <img src="/src/assets/logos/logo.png" alt="logo" className="logo" />
      <button className="btn" onClick={() => navigate("/login")}>
        Iniciar
      </button>
    </div>
  );
}
