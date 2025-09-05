import React from "react";
import "../styles/login.css";
import googleIcon from "../assets/icons/google-icon.png";
import facebookIcon from "../assets/icons/facebook-icon.png";

export default function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    if (form.checkValidity()) {
      const email = form.email.value;
      console.log("Formulario válido:", { email });
      // acá podrías redirigir o hacer un fetch
    } else {
      form.reportValidity(); // fuerza que el navegador muestre los mensajes nativos
    }
  };

  return (
    <div className="login">
      <img
        src="/src/assets/images/login-img.png"
        alt="login"
        className="top-img"
      />

      <h2 className="inter-font">Sacar turno nunca fue tan fácil</h2>
      <p className="roboto-font">
        Reservá tu cancha en segundos. Sin esperas, sin complicaciones.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <p className="input-label">Ingresa tu correo electrónico</p>
        <input
          type="email"
          name="email"
          placeholder="Ej: example@gmail.com"
          className="input"
          required
        />
        <button type="submit" className="btn">
          Continuar
        </button>
      </form>

      <div className="divider">
        <hr className="divider-line" />
        <span className="divider-text">o</span>
        <hr className="divider-line" />
      </div>

      <div className="social-buttons">
        <button className="btn-social">
          <img src={googleIcon} alt="Google" className="icon" />
          Iniciar Sesión con Google
        </button>
        <button className="btn-social">
          <img src={facebookIcon} alt="Facebook" className="icon" />
          Iniciar sesión con Facebook
        </button>
      </div>

      <p className="club">
        ¿Sos un club? Publicá tus canchas y recibí reservas online.
        <a href="#"> Registrar club »</a>
      </p>
    </div>
  );
}
