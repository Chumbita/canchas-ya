import { useEffect, useState } from "react";
import { useOtpService } from "../../hooks/useOtpService";
import { useNavigate } from "react-router-dom";
import { useOtpInput } from "../../hooks/useOtpInput";
import { useTimer } from "../../hooks/useTimer";
import pageStyle from "./VerifyOtp.module.css";
import textStyle from "../../styles/base/Text.module.css";
import inputStyle from "../../styles/base/Inputs.module.css";
import btnStyle from "../../styles/base/Button.module.css";
import arrowLeft from "../../assets/icons/arrow-left-sm.svg";

const formatTime = (seconds) => {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
};

export default function VerifyOtp() {
  const email = location.state?.email || sessionStorage.getItem("otpEmail");
  const navigate = useNavigate();
  const { otp, otpCode, isValid, handleChange, handleKeyDown, inputsRef } =
    useOtpInput(4);
  const { time: resendTimer, reset: resetResendTimer } = useTimer(60);
  const { loading, error, handleVerifyOtp, handleResendOtp, clearError } = useOtpService();

  return (
    <div className={pageStyle["contenedor"]}>
      <div className={pageStyle["verify-otp"]}>
        <h2
          className={`${textStyle["text-xl"]} ${textStyle["text-primary"]} ${textStyle["text-extra-bold"]}`}
        >
          Ingresa el código de 4 dígitos que se te envió a: {email}
        </h2>
        <div className={pageStyle["verify-otp__fields"]}>
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              maxLength={1}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => {
                handleChange(index, e.target.value);
                clearError();
              }}
              onKeyDown={(e) => handleKeyDown(index, e)}
              tabIndex={index + 1}
              className={`${inputStyle["input-otp"]} ${
                error ? inputStyle["input-error"] : ""
              }`}
            />
          ))}
        </div>
        <div className={pageStyle["verify-otp__text"]}>
          {error && (
            <p
              className={`${pageStyle["verify-otp__text-error"]} ${textStyle["text-error"]} ${textStyle["text-xs"]} ${textStyle["text-regular"]}`}
            >
              {error ? error : ""}
            </p>
          )}
          <p
            className={`${textStyle["text-secondary"]} ${textStyle["text-xs"]} ${textStyle["text-regular"]}`}
          >
            Consejo: asegúrate de revisar la bandeja de entrada y la carpeta de
            correo no deseado.
          </p>
        </div>

        <div className={pageStyle["resend-otp"]}>
          <button
            className={`${btnStyle["btn"]} ${btnStyle["btn-circle"]} ${btnStyle["btn-black"]}`}
            onClick={() => handleResendOtp(resetResendTimer)}
            disabled={resendTimer > 0 || loading}
          >
            Reenviar
          </button>
          <label
            className={`${textStyle["text-secondary"]} ${textStyle["text-sm"]}`}
          >
            {formatTime(resendTimer)}
          </label>
        </div>
        <div className={pageStyle["verify-otp__buttons"]}>
          <button
            className={`${btnStyle["btn"]} ${btnStyle["btn-circle"]} ${btnStyle["btn-primary"]}`}
            onClick={() => navigate("/")}
          >
            <img src={arrowLeft} className={pageStyle["icon"]} />
          </button>
          <button
            className={`${btnStyle["btn"]} ${btnStyle["btn-circle"]} ${btnStyle["btn-primary"]}`}
            onClick={() => handleVerifyOtp(isValid, otpCode)}
            disabled={!isValid || loading}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
