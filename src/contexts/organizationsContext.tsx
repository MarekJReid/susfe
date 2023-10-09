import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import useFetchOrganizations from "../api/fetchCalls/organizations/useFetchOrganizations";
import { Organization } from "../types/device-types";
import { useDeviceContext } from "./deviceContext";
import { fetchFromAPI } from "../api/api";
import { createOrganizationHierarchy } from "../api/fetchCalls/organizations/utils";

// Define the organization context
export interface OrganizationContextProps {
  organizations: Organization[];
  loadingOrganizations: boolean;
  errorOrganizations: string | unknown;
  organizationsForDropdown?: string[] | null | undefined;
  selectedOrganization: string | null;
  setSelectedOrganization: React.Dispatch<React.SetStateAction<string | null>>;
}

export const OrganizationContext = createContext<
  OrganizationContextProps | undefined
>(undefined);

interface OrganizationProviderProps {
  children: ReactNode;
}

type Item = {
  id: string | undefined;
  children?: Item[];
};

export function findItemIndexInParents(
  item: Item,
  parents: Item[] | null | undefined
): number {
  console.log("item", item.id);

  // Check if the item exists directly in the parents array
  const directIndex = parents?.findIndex((parent) => parent.id === item.id);
  if (directIndex !== undefined && directIndex !== -1) return directIndex;

  // Check if the item exists as a child in any of the parents' children array
  for (let i = 0; parents && i < parents.length; i++) {
    const childExistence = parents[i]?.children?.some(
      (child) => child.id === item.id
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
      console.log("fetching data");
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
          const index = findItemIndexInParents(
            { id: orgId },
            organizationHierarchy
          );
          if (index !== -1) {
            const org = organizationHierarchy[index];
            if (org && !acc.includes(org.id)) {
              acc.push(org.id);
            }
          }
        });
      } else if (!acc.includes("No Organization")) {
        acc.push("No Organization");
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
