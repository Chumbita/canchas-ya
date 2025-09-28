import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAuthService } from "./useAuthService";
import { useTimer } from "./useTimer";
import {
  startAuthTransition,
  clearAuthTransition,
} from "../utils/authTransitions";

export const useOtpService = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || sessionStorage.getItem("otpEmail");

  const { login, role, verifyOtp } = useAuth();


  const { loading, error, setError, requestOtpApi, verifyOtpApi } =
    useAuthService();

  const { time: resendTimer, reset: resetResendTimer } = useTimer(60);

  const [attempts, setAttempts] = useState(0);
  

  const clearError = () => setError(null);

  const handleRequestOtp = async (email) => {
    try {
      const response = await requestOtpApi(email);
      if (response && response.success) {
        login({ email }, null, "club");
        navigate("/verify-otp", {
          state: { email },
          replace: true,
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleVerifyOtp = async (isValid, otpCode) => {
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
          verifyOtp( res.user, res.isNew ? false : true, res.user.status);
          navigate(res.isNew ? "/club/create-account" : "/club/dashboard", {
            replace: true,
          });
        }
      }
    } catch (error) {
      clearAuthTransition();
    }
  };

  const handleResendOtp = async (resetResendTimer) => {
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
      navigate("/club/login", { replace: true });
      return;
    }
  }, [email, navigate]);

  return {
    error,
    loading,
    handleRequestOtp,
    handleVerifyOtp,
    handleResendOtp,
    clearError,
  };
};
