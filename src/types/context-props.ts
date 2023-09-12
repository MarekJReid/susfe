export interface AuthContextProps {
  isAuthenticated: boolean;
  login: () => void; // Ensure that login returns void
  logout: () => void; // Ensure that logout returns void
}
