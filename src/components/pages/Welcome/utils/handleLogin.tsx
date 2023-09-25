export const handleLogin =
  (setIsAuthenticated: (value: boolean) => void) => async () => {
    try {
      // Redirect the user to the /login endpoint to initiate the MSAL login flow
      window.location.href = "http://localhost:8000/login";
      setIsAuthenticated(true);
      // The Go server will handle the MSAL authentication and redirect back to your application
      // Once redirected back, you can handle post-login logic if needed
    } catch (error) {
      // Handle login error
      console.error("Login error:", error);
    }
  };
