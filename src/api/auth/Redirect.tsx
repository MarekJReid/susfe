import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const RedirectComponent: React.FC = () => {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Here, you'd process the authentication result. This might involve checking the URL for tokens,
    // making an additional API call, etc.

    // For simplicity, let's assume authentication was successful if we reached this point.
    setIsAuthenticated(true);

    // Then redirect to another page, e.g., the dashboard.
    navigate("/devices");
  }, [setIsAuthenticated, history]);

  return <div>Processing authentication...</div>;
};

export default RedirectComponent;
