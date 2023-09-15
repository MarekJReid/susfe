import React from "react";
import { Navigate } from "react-router-dom";
import { ProtectedRouteProps } from "../types/user-types";
// import { default as Cookies } from "js-cookie";
const Protected: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  children,
}) => {
  // Cookies.set("name", "sessionCookie");
  // console.log("sessionCookie", Cookies.get());
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default Protected;
