import { useContext } from "react";
import { AuthContextProps } from "../types/context-props";
import { AuthContext } from "../contexts/authContext";

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
