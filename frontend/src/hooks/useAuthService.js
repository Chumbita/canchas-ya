import { useState } from "react";
import { authService } from "../services/authService";

export const useAuthService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestOTP = async (email) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.requestOTP(email);

      sessionStorage.setItem("otpEmail", email);
      sessionStorage.setItem("otpTime", Date.now().toString());

      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (email, otp) => {
    setLoading(true);
    setError(null);
    try {
      if (!email) throw new Error("Debe ingresar el correo");
      if (!otp || otp.length !== 4)
        throw new Error("El código debe tener 4 dígitos");
      if (!/^\d+$/.test(otp))
        throw new Error("El código solo debe contener números");
      const response = await authService.verifyOTP(email, otp);
      sessionStorage.setItem("authToken", response.token);
      sessionStorage.removeItem("otpEmail");
      sessionStorage.removeItem("otpTime");
      return response;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    setError,
    requestOTP,
    verifyOTP,
  };
};
