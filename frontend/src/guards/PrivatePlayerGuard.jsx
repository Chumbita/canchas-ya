import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const PrivatePlayerGuard = () => {
  const { role, step } = useAuth();

  if (role !== "player" || step !== "registered") {
    return <Navigate to="/player/login" replace />;
  }

  return <Outlet />;
};
