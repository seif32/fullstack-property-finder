import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useAuth();
  const location = useLocation(); // ✅ Needed to check current path

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  // ✅ NEW: Prevent admin from accessing any route except /admin/users
  if (user.role === "ADMIN" && location.pathname !== "/admin/users") {
    return <Navigate to="/admin/users" replace />;
  }

  // ✅ Role-based access check for other users
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
