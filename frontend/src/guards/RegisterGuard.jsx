import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const RegisterGuard = () => {
  const { step, role } = useAuth();

  if (step !== "register") {
    if (role === "club") return <Navigate to="/club/login" replace />;
    if (role === "player") return <Navigate to="/player/login" replace />;
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
