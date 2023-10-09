export interface AuthContextProps {
  userData: unknown;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  isAuthenticated: boolean;
  login: () => void; // Ensure that login returns void
  logout: () => void; // Ensure that logout returns void
}
