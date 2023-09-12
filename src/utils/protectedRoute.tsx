import React from "react";
import { Navigate } from "react-router-dom";
import { ProtectedRouteProps } from "../types/user-types";

const Protected: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  children,
}) => {
  console.log(isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default Protected;
