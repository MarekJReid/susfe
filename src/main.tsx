/**
 * @file Entry point of the React application.
 * @description This file initializes the application and renders the root component.
 * @date 2nd September 2023
 * @author Marek Reid
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/global.css";
import { AuthProvider } from "./contexts/authContext.tsx";
import { DeviceProvider } from "./contexts/deviceContext.tsx";
import { OrganizationsProvider } from "./contexts/OrganizationsProvider.tsx";

/**
 * Render the root component of the application into the DOM.
 * @param {HTMLElement} rootElement - The root HTML element where the application will be rendered.
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <DeviceProvider>
        <OrganizationsProvider>
          <App />
        </OrganizationsProvider>
      </DeviceProvider>
    </AuthProvider>
  </React.StrictMode>
);
