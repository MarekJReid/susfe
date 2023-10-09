import {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";
import { AuthContextProps } from "../types/context-props";
import { fetchFromAuthAPI } from "../api/authApi";

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<unknown>(null);
  const [sessionId, setSessionId] = useState<string | null>(null); // <-- Add state for sessionId

  const getCookie = () => {
    const cookie = document.cookie.replace("session-id=", "");
    return cookie;
  };

  const fetchUserData = async (sessionId: string) => {
    try {
      if (sessionId) {
        // <-- Check if sessionId is not null
        const data = await fetchFromAuthAPI("/user-info", sessionId);

        setUserData(data);
        data ? setIsAuthenticated(true) : setIsAuthenticated(false);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("err", err);
      }
    }
  };

  const login = useCallback(() => {
    const sessionId = getCookie();
    // <-- Get sessionId from cookie
    setSessionId(sessionId); // <-- Set sessionId state

    fetchUserData(sessionId);

    // sessionId != null && setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    setSessionId(null); // <-- Clear sessionId state on logout
    window.location.href = "http://localhost:8000/logout";
  }, []);

  const contextValue: AuthContextProps = useMemo(
    () => ({
      setIsAuthenticated,
      isAuthenticated,
      userData,
      setUserData,
      sessionId, // <-- Include sessionId in context value
      login,
      logout,
    }),
    [isAuthenticated, login, logout, userData, sessionId] // <-- Add sessionId to dependency array
  );

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
