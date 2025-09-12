import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const OtpGuard = () => {
  const { step } = useAuth();

  if (step !== "otp") {
    return <Navigate to="/club/login" replace />;
  }

  return <Outlet />;
};
