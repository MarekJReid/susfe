import {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import { AuthContextProps } from "../types/context-props";

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = useCallback(() => {
    // Here handle the actual authentication logic,

    setIsAuthenticated(true);
    // note that due to the context being outside of the router, we handle redirect in the loginHndler
    // function instead
  }, []);

  const logout = useCallback(() => {
    window.location.href = "http://localhost:8000/logout";
  }, []);

  const contextValue: AuthContextProps = useMemo( 
    () => ({
      setIsAuthenticated,
      isAuthenticated,
      login,
      logout,
    }),
    [isAuthenticated, login, logout, isAuthenticated]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
