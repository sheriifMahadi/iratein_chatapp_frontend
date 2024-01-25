import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";
import AuthService from "../services/AuthService";
export function ProtectedRoute({ children }: { children: any }) {
  const { user } = useContext(AuthContext);

  // const user =  AuthService.getCurrentUser()
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}