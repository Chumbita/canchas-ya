import { useEffect, useState, useRef } from "react";
import { useAuthService } from "../../hooks/useAuthService";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useOTP } from "../../hooks/useOTP";
import { useTimer } from "../../hooks/useTimer";
import { useAuth } from "../../context/AuthContext";
import {
  startAuthTransition,
  clearAuthTransition,
} from "../../utils/authTransitions";
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
  const navigate = useNavigate();
  const location = useLocation();
  const {
    otp,
    setOtp,
    otpCode,
    isValid,
    handleChange,
    handleKeyDown,
    inputsRef,
  } = useOTP();
  const { loading, error, setError, requestOTP, verifyOTP } = useAuthService();
  const { time: resendTimer, reset: resetResendTimer } = useTimer(60);
  const { role, verifyOtp: setAuthOtp } = useAuth();
  const [attempts, setAttempts] = useState(0);
  const email = location.state?.email || sessionStorage.getItem("otpEmail");

  // Protección de la ruta
  useEffect(() => {
    const storedTime = sessionStorage.getItem("otpRequestTime");
    if (
      !email ||
      (storedTime && Date.now() - parseInt(storedTime) > 5 * 60 * 1000)
    ) {
      sessionStorage.removeItem("otpEmail");
      sessionStorage.removeItem("otpRequestTime");
      navigate("/login/club", { replace: true });
      navigate("/login/club", { replace: true });
      return;
    }
  }, [email, navigate]);

  const clearError = () => setError(null);

  // Verificar OTP
  const handleVerify = async () => {
    if (!isValid) return;

    try {
      const response = await verifyOTP(email, otpCode, role);

      startAuthTransition();
      if (response && response.success) {
        const res = response.data;

        if (res.isNew) {
          setAuthOtp(false);
          navigate("/club/create-account", {
            replace: true,
            state: { fromVerification: true },
          });
        } else {
          setAuthOtp(true, res.status);
          navigate("/club/dashboard", {
            replace: true,
            state: { fromVerification: true },
          });
        }
      }
    } catch (error) {
      clearAuthTransition();
    }
  };

  const handleResend = async () => {
    try {
      await requestOTP(email);
      resetResendTimer(60);
    } catch {}
  };

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
          {error && attempts < 3 && (
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
            onClick={handleResend}
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
            onClick={() => navigate("/login/club")}
          >
            <img src={arrowLeft} className={pageStyle["icon"]} />
          </button>
          <button
            className={`${btnStyle["btn"]} ${btnStyle["btn-circle"]} ${btnStyle["btn-primary"]}`}
            onClick={() => handleVerify()}
            disabled={!isValid || loading}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
