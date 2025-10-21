{
  /* Menu overlay para mobile */
}
import React from "react";
import { Link } from "react-router-dom";
import styles from "./MenuOverlay.module.css";
import closeIcon from "../../assets/icons/close-icon.svg";

export default function MenuOverlay({ onClose }) {
  return (
    <div className={styles.overlay}>
      <button
        className={styles.close}
        onClick={onClose}
        aria-label="Cerrar menú"
      >
        <img src={closeIcon} alt="close-icon" />
      </button>
      <nav className={styles.menu}>
        <Link to="/player/login">Inciar sesión</Link>
        <Link to="/club/login">Gestionar club</Link>
      </nav>
    </div>
  );
}
