import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {

  const auth = useSelector((state) => state.auth);


  if (!auth?.user) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
