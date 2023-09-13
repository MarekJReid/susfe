import React, { ReactNode, createContext, useContext, useState } from "react";
import useFetchOrganizations from "../api/fetchCalls/organizations/useFetchOrganizations";
import { computeUniqueOrganizationsForDropdown } from "../hooks/organizations/useOrganizationsForDropdown";
import { Organization } from "../types/device-types";
import { useDeviceContext } from "./deviceContext";

// Define the organization context
interface OrganizationContextProps {
  organizations: Organization[];
  loadingOrganizations: boolean;
  errorOrganizations: string | unknown;
  organizationsForDropdown: Organization[] | null;
  selectedOrganization: string | null;
  setSelectedOrganization: React.Dispatch<React.SetStateAction<string | null>>;
  // setOrganizationsForDropdown: React.Dispatch<
  //   React.SetStateAction<Organization[] | null>
  // >;
}

const OrganizationContext = createContext<OrganizationContextProps | undefined>(
  undefined
);

interface OrganizationProviderProps {
  children: ReactNode;
}

export const OrganizationsProvider: React.FC<OrganizationProviderProps> = ({
  children,
}) => {
  const { devices } = useDeviceContext();
  const { organizations, loadingOrganizations, errorOrganizations } =
    useFetchOrganizations();
  const [selectedOrganization, setSelectedOrganization] = useState<
    string | null
  >(null);

  const uniqueOrganizationsForDropdown = computeUniqueOrganizationsForDropdown(
    devices,
    organizations
  );

  return (
    <OrganizationContext.Provider
      value={{
        organizations,
        loadingOrganizations,
        organizationsForDropdown: uniqueOrganizationsForDropdown,
        errorOrganizations,
        selectedOrganization,
        setSelectedOrganization,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganizationContext = (): OrganizationContextProps => {
  const context = useContext(OrganizationContext);
  if (!context) {
    throw new Error(
      "useOrganizationContext must be used within an OrganizationProvider"
    );
  }
  return context;
};
