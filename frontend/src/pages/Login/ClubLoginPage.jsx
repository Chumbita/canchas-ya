import React from "react";
import styles from "./ClubLoginPage.module.css";
import stylesBtn from "../../styles/base/Button.module.css";
import stylesLabel from "../../styles/base/Labels.module.css";
import stylesInput from "../../styles/base/Inputs.module.css";
import googleIcon from "../../assets/icons/google-icon.svg";
import heroImage from "../../assets/images/hero-image-1.svg";
import { useClubLogin } from "../../hooks/useClubLogin";

export default function ClubLoginPage() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleLogin,
  } = useClubLogin();

  return (
    <div className={styles.content}>
      <div className={styles["login-page"]}>
        <section className={styles["login-page__hero"]}>
          <img
            className={styles["login-page__hero__image"]}
            src={heroImage}
            alt=""
          />
          <h1 className={styles["login-page__headline"]}>
            Mostrá, recibí y gestioná
          </h1>
          <p className={styles["login-page__subheadline"]}>
            Publicitá tus canchas y conectá con más jugadores.
          </p>
        </section>
        <section className={styles["login-page__form"]}>
          <form className={styles["login-form"]}>
            <div className={styles["login-form__fields"]}>
              <label htmlFor="email" className={stylesLabel["label"]}>
                Ingresa tu correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Ej: example@gmail.com"
                className={stylesInput["input"]}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              className={stylesBtn["btn"] + " " + stylesBtn["btn-primary"]}
              onClick={handleLogin}
            >
              Continuar
            </button>
            <div className={styles["login-page__divider"]}>
              <div className={styles["login-page__divider-line"]}></div>
              <span className={styles["login-page__divider-text"]}>o</span>
              <div className={styles["login-page__divider-line"]}></div>
            </div>
            <button
              type="button"
              className={`${stylesBtn["btn"]} ${stylesBtn["btn-secondary"]} ${styles["login-form__google-button"]}`}
            >
              <img
                src={googleIcon}
                alt="Google"
                className={styles["login-form__google-icon"]}
              />
              Continuar con Google
            </button>
          </form>
        </section>
        <div className={styles["login-page__footer"]}>
          <p className={styles["login-page__footer__text"]}>
            ¿Aún no registraste tu club? Publicá tus canchas y recibí reservas
            online.{" "}
            <a
              className={styles["login-page__footer__link"]}
              href="/club/register"
            >
              Registrar club →
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
