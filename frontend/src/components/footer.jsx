import React from "react";
import facebookIcon from "../assets/icons/facebook-icon.png";
import instagramIcon from "../assets/icons/instagram-icon.png";
import twitterIcon from "../assets/icons/twitter-icon.png";

export default function Footer() {
  return (
    <footer className="foot">
      <div className="fcol">
        <h4 className="ftt">Conectá con nosotros</h4>
        <p>
          Escribinos, visitanos en redes o conocé cómo gestionar tu club con
          CanchasYa.
        </p>
        <div className="icons">
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
            <img src={facebookIcon} alt="Facebook" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            <img src={instagramIcon} alt="Instagram" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
            <img src={twitterIcon} alt="Twitter" />
          </a>
        </div>
      </div>
      <div className="fcol">
        <h4 className="ftt">Startup Info</h4>
        <a href="#">¿Quiénes somos?</a>
        <a href="#">Nuestro equipo</a>
      </div>
      <div className="fcol">
        <h4 className="ftt">Acciones rápidas</h4>
        <a href="#">Reservá tu turno</a>
        <a href="#">Gestioná tu club</a>
        <a href="#">Preguntas frecuentes</a>
      </div>
    </footer>
  );
}
