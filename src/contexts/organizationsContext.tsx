import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import useFetchOrganizations from "../api/fetchCalls/organizations/useFetchOrganizations";
import { computeUniqueOrganizationsForDropdown } from "../hooks/organizations/useOrganizationsForDropdown";
import { Organization } from "../types/device-types";
import { useDeviceContext } from "./deviceContext";
import { fetchFromAPI } from "../api/api";
import { createOrganizationHierarchy } from "../api/fetchCalls/organizations/utils";

// Define the organization context
interface OrganizationContextProps {
  organizations: Organization[];
  loadingOrganizations: boolean;
  errorOrganizations: string | unknown;
  organizationsForDropdown?: Organization[] | unknown | null;
  selectedOrganization: string | null;
  setSelectedOrganization: React.Dispatch<React.SetStateAction<string | null>>;
}

const OrganizationContext = createContext<OrganizationContextProps | undefined>(
  undefined
);

interface OrganizationProviderProps {
  children: ReactNode;
}

function findItemIndexInParents(item, parents) {
  // Check if the item exists directly in the parents array
  const directIndex = parents.findIndex((parent) => parent.id === item);
  if (directIndex !== -1) return directIndex;

  // Check if the item exists as a child in any of the parents' children array
  for (let i = 0; i < parents.length; i++) {
    const childExistence = parents[i].children.some(
      (child) => child.id === item
    );
    if (childExistence) return i;
  }

  return -1; // Return -1 if the item doesn't exist
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
  const [organizationHierarchy, setOrganizationHierarchy] = useState<
    Organization[] | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFromAPI("/all-organizations");
      const organizationHierarchyToPush = createOrganizationHierarchy(data);
      setOrganizationHierarchy(organizationHierarchyToPush);
    };

    fetchData();
  }, []);

  const organizationsForDropdown = useMemo(() => {
    const uniqueOrgsFromDevices = devices.reduce<string[]>((acc, device) => {
      if (device.organizations) {
        device.organizations.forEach((orgId: string) => {
          const index = findItemIndexInParents(orgId, organizationHierarchy);
          if (index !== -1 && !acc.includes(organizationHierarchy[index])) {
            acc.push(organizationHierarchy[index]);
          }
        });
      } else if (!acc.includes("undefined")) {
        acc.push("undefined");
      }
      return acc;
    }, []);
    return uniqueOrgsFromDevices;
  }, [devices, organizationHierarchy]);

  return (
    <OrganizationContext.Provider
      value={{
        organizations,
        loadingOrganizations,
        organizationsForDropdown,
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
