import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// Wrap a page with this to send logged-out users to /login.
// The attempted page is remembered so login can return them there.
export default function RequireAuth({ children }) {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}
