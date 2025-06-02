import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const auth = useSelector((state) => state.auth);

  if (auth.loading) return null; // Or show a spinner

  if (!auth.user) return <Navigate to="/login" />;

  if (allowedRoles && !allowedRoles.includes(auth.user.role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
