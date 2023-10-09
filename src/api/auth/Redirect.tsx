import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const RedirectComponent: React.FC = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    login();

    isAuthenticated === true && navigate("/dashboard");
  }, [isAuthenticated, login, navigate]);

  return <div>Processing authentication...</div>;
};

export default RedirectComponent;
