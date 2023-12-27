import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  const ProtectedRoute = ({ children }: any) => {
    if (!isAuthenticated()) {
      localStorage.clear();
      return <Navigate to="/signin" replace />;
    }
    return <>{children}</>;
  };

  return ProtectedRoute;
};

export default ProtectedRoute;
