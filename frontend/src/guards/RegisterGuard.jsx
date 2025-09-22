import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { isAuthTransitioning } from "../utils/authTransitions";

export const RegisterGuard = () => {
  const { step, role } = useAuth();
  const insTransitioning = isAuthTransitioning();

  if (step !== "register" && !insTransitioning) {
    if (role === "club") return <Navigate to="/club/login" replace />;
    if (role === "player") return <Navigate to="/player/login" replace />;
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
