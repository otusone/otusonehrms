import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; 

const ProtectedRoute = ({ children}) => {
  
  const auth = useSelector((state) => state.auth); 

  
  if (!auth?.user) return <Navigate to="/login" />;

  
//   if (allowedRoles && !allowedRoles.includes(auth.user.role)) {
//     return <Navigate to="/unauthorized" />;
//   }

  return children;
};

export default ProtectedRoute;
