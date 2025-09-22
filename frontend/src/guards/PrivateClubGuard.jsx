import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const PrivateClubGuard = ({ requiredStatus }) => {
  const { role, step, status } = useAuth();

  if (role !== "club" || step !== "registered") {
    return <Navigate to="/club/login" replace />;
  }

  if (requiredStatus && status !== requiredStatus) {
    return <Navigate to="/club/status" replace />;
  }

  return <Outlet />;
};
