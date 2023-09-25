import React, { useEffect, useMemo, useState } from "react";
import useFetchOrganizations from "../api/fetchCalls/organizations/useFetchOrganizations";
import { Organization } from "../types/device-types";
import { useDeviceContext } from "./deviceContext";
import { fetchFromAPI } from "../api/api";
import { createOrganizationHierarchy } from "../api/fetchCalls/organizations/utils";
import {
  OrganizationProviderProps,
  findItemIndexInParents,
  OrganizationContext,
} from "./organizationsContext";

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
    const uniqueOrgsFromDevices = devices.reduce<string[] | undefined>(
      (acc, device) => {
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
      },
      []
    );
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
