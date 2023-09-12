// handleLogin.ts

import { NavigateFunction } from "react-router-dom";

export const handleLogin =
  (login: () => void, navigate: NavigateFunction) => async () => {
    try {
      // Simulate some login logic here
      // You can replace this with actual authentication logic

      // Assuming the login is successful
      await login();

      // Navigate to the dashboard after successful login
      navigate("/devices");
    } catch (error) {
      // Handle login error
      console.error("Login error:", error);
    }
  };
