import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { use } from "react"

export default function PrivateRoutes({ children, role }) {
  const { token, role: userRole } = useAuth();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (role && role !== userRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}
