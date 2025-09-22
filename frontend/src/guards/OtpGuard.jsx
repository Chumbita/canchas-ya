import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { isAuthTransitioning } from "../utils/authTransitions";

export const OtpGuard = () => {
  const { step } = useAuth();
  const insTransitioning = isAuthTransitioning();
  
  if (step !== "otp" && !insTransitioning) {
    return <Navigate to="/club/login" replace />;
  }

  return <Outlet />;
};
