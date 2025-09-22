import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAuthService } from "../hooks/useAuthService";
import { useOTP } from "../hooks/useOTP";
import { useTimer } from "../hooks/useTimer";
import { startAuthTransition, clearAuthTransition } from "../utils/authTransitions";

export const useVerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { 
    role, 
    verifyOtp, 
  } = useAuth();

  const {
    otp,
    setOtp,
    otpCode,
    isValid,
    handleChange,
    handleKeyDown,
    inputsRef,
  } = useOTP();

  const { 
    loading, 
    error, 
    setError, 
    requestOtpApi, 
    verifyOtpApi 
  } = useAuthService();

  const { 
    time: resendTimer, 
    reset: resetResendTimer 
  } = useTimer(60);

  const [attempts, setAttempts] = useState(0);
  const email = location.state?.email || sessionStorage.getItem("otpEmail");

  const clearError = () => setError(null);

  const handleVerifyOtp = async () => {
    if (!isValid) return;

    try {
      const response = await verifyOtpApi(email, otpCode, role);
      startAuthTransition();

      if (response && response.success) {
        const res = response.data;
        if (role === "player") {
          verifyOtp(res.isNew ? false : true, res.status);
          navigate(res.isNew ? "/player/create-account" : "/", {
            replace: true,
          });
        }
        if (role === "club") {
          verifyOtp(res.isNew ? false : true, res.status);
          navigate(res.isNew ? "/club/create-account" : "/club/dashboard", {
            replace: true,
          });
        }
      }
    } catch (error) {
      clearAuthTransition();
    }
  };
  
  const handleResendOtp = async () => {
    try {
      await requestOtpApi(email);
      resetResendTimer(60);
    } catch {}
  };

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

  return {
    otp,
    otpCode,
    isValid,
    loading,
    error,
    resendTimer,
    inputsRef,
    handleChange,
    handleKeyDown,
    handleVerifyOtp,
    handleResendOtp,
    clearError,
    email,
  };
};
