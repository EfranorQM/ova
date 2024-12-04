import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  allowedType: number[]; // Roles permitidos (1, 2, 3)
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedType, children }) => {
  const storedData = localStorage.getItem("usuario");
  const usuario = storedData ? JSON.parse(storedData) : null;

  if (!usuario) {
    return <Navigate to="/" />;
  }

  if (!allowedType.includes(usuario.rol)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
