import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export const RequiredCompleteProfileGuard = () => {
  const { user, role } = useAuth();

  // Si no hay usuario logueado, no hacemos nada
  if (!user) return <Outlet />;

  const isIncomplete =
    (role === "player" && !user.first_name && !user.last_name) ||
    (role === "club" && !user.name && !user.location);

  if (isIncomplete) {
    // Redirige automáticamente al formulario de creación
    return role === "player" ? (
      <Navigate to="/player/create-account" replace />
    ) : (
      <Navigate to="/club/create-account" replace />
    );
  }

  // Si el perfil está completo, continúa la navegación normalmente
  return <Outlet />;
}
