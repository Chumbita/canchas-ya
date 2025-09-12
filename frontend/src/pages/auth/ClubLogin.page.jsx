import { useState } from "react";
import pageStyle from "./ClubLogin.module.css";
import btnStyle from "../../styles/base/Button.module.css";
import textStyle from "../../styles/base/Text.module.css";
import inputStyle from "../../styles/base/Inputs.module.css";
import googleIcon from "../../assets/icons/google-icon.svg";
import heroImage from "../../assets/images/hero-image-1.svg";
import { useAuthService } from "../../hooks/useAuthService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ClubLogin() {
  const [email, setEmail] = useState("");
  const { login } = useAuth();
  const { loading, error, requestOTP, verifyOTP } = useAuthService();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await requestOTP(email);
      if (response && response.success) {
        login({email}, null, "club");
        navigate("verify-otp", {
          state: { email },
          replace: true,
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className={pageStyle.content}>
      <div className={pageStyle["login-page"]}>
        <section className={pageStyle["login-page__hero"]}>
          <img
            className={pageStyle["login-page__hero__image"]}
            src={heroImage}
            alt=""
          />
          <h1 className={`${textStyle["text-primary"]} ${textStyle["text-2xl"]} ${textStyle["text-extra-bold"]}`}>
            Mostrá tu espacio, recibí turnos y gestioná sin drama
          </h1>
          <p className={`${textStyle["text-secondary"]} ${textStyle["text-sm"]} ${textStyle["text-ligth"]} ${pageStyle["login-page__subheadline"]}`}>
            Publicitá tus canchas y conectá con más jugadores.
          </p>
        </section>
        <section className={pageStyle["login-page__form"]}>
          <form className={pageStyle["login-form"]} onSubmit={handleLogin}>
            <div className={pageStyle["login-form__fields"]}>
              <label htmlFor="email" className={`${textStyle["text-primary"]} ${textStyle["text-sm"]} ${textStyle["text-medium"]}`}>
                Ingresa tu correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Ej: example@gmail.com"
                className={inputStyle["input"]}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className={btnStyle["btn"] + " " + btnStyle["btn-primary"]}
            >
              Continuar
            </button>
            <div className={pageStyle["login-page__divider"]}>
              <div className={pageStyle["login-page__divider-line"]}></div>
              <span className={pageStyle["login-page__divider-text"]}>o</span>
              <div className={pageStyle["login-page__divider-line"]}></div>
            </div>
            <button
              type="button"
              className={`${btnStyle["btn"]} ${btnStyle["btn-secondary"]} ${pageStyle["login-form__google-button"]}`}
            >
              <img
                src={googleIcon}
                alt="Google"
                className={pageStyle["login-form__google-icon"]}
              />
              Continuar con Google
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
