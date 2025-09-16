import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth";

const ProtectedRoute = () => {
  const { isAuthenticated, restoring } = useAuthStore();

  if (restoring) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
