import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children, user }) {
  const navigate = useNavigate();

  if (!user) {
    navigate("/login", { replace: true });
  }

  return user ? children : null;
}
