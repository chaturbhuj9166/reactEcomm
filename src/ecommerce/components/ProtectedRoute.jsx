import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn === null) {
    return <div>Loading...</div>; // waiting for authCheck
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
