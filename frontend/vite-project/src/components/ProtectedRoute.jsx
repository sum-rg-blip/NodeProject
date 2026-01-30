// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requiredRole }) {
  const { user } = useAuth();

  if (!user) {
    // Haddii user login-gareynin
    return <Navigate to="/loginAdmin" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Haddii user aanu lahayn role sax ah
    return <Navigate to="/" replace />;
  }

  return children;
}
