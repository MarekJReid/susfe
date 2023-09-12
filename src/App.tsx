/**
 * @file Main application component for the React application.
 * @description This component serves as the entry point for the application.
 * @date 2nd September 2023
 * @author Marek Reid
 */

import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import { Layout } from "./components/Layout/Layout";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import Devices from "./components/pages/Devices/Devices";
import userData from "./data/msalUserDataSample.json";
import Protected from "./utils/protectedRoute";

import { Welcome } from "./components/pages/Welcome/Welcome";
import { useAuth } from "./hooks/useAuth";

/**
 * Initialize the React Query client.
 */
const queryClient = new QueryClient();

/**
 * Main application component that serves as the entry point for the application.
 * @returns {JSX.Element} The rendered App component.
 */
function App(): JSX.Element {
  const { isAuthenticated } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Welcome welcomeMessage="Wilkommen" />} />
            <Route
              path="/dashboard"
              element={
                <Protected isAuthenticated={isAuthenticated}>
                  <Dashboard userData={userData} />
                </Protected>
              }
            />
            <Route
              path="/devices"
              element={
                <Protected isAuthenticated={isAuthenticated}>
                  <Devices />
                </Protected>
              }
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
