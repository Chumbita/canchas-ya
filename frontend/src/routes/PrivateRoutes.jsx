import { Navigate, replace } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoutes({ children, role, requiredStatus }) {
  const { user, token, role: userRole } = useAuth();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (role && role !== userRole) {
    return <Navigate to="/" replace />;
  }

  if (userRole === "club" && requiredStatus && user.status !== requiredStatus) {
    switch (user.status) {
      case "pending":
        return <Navigate to="/club/pending" replace />;
      case "rejected":
        return <Navigate to="/club/rejected" replace />;
      case "null":
        return <Navigate to="/register/club" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
}
