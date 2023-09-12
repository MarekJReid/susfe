import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useMemo,
} from "react";
import useFetchDevices from "../api/fetchCalls/useFetchDevices";
import { Device, Organization } from "../types/device-types";
import useFetchOrganizations from "../api/fetchCalls/useFetchOrganizations";
// Adjust the path accordingly

interface DeviceContextProps {
  devices: Device[];
  filteredDevices: Device[];
  organizations: Organization[] | undefined;
  organizationsForDropdown: Organization[] | unknown;
  selectedOrganization: Organization | null | unknown;
  setSelectedOrganization: React.SetStateAction<string | null | unknown>;
  loading: boolean;
  error: string | null;
  refetchDevices: () => void; // Function to re-fetch devices
}

const DeviceContext = createContext<DeviceContextProps | undefined>(undefined);

interface DeviceProviderProps {
  children: ReactNode;
}

export const DeviceProvider: React.FC<DeviceProviderProps> = ({ children }) => {
  const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);
  const [organizationsForDropdown, setOrganizationsForDropdown] = useState<
    Organization[] | unknown
  >([]);
  const [selectedOrganization, setSelectedOrganization] = useState<
    Organization | null | unknown
  >(null);
  const { devices, loading, error, refetch } = useFetchDevices();
  const { organizations } = useFetchOrganizations();
  function getUniqueOrganizations(devices: Device[]) {
    const orgSet = new Set();
    let hasUndefined = false;

    devices.forEach((device) => {
      if (device.organizations && device.organizations.length) {
        device.organizations.forEach((org) => orgSet.add(org));
      } else {
        hasUndefined = true;
      }
    });

    const result = [...orgSet];
    if (hasUndefined) {
      result.push(undefined);
    }

    return result;
  }
  useMemo(() => {
    const orgsToUseInDropdown = getUniqueOrganizations(devices);

    setOrganizationsForDropdown(orgsToUseInDropdown);
  }, [devices]);

  useEffect(() => {
    if (devices) {
      setFilteredDevices(devices);
    }
  }, [devices, organizations]);

  return (
    <DeviceContext.Provider
      value={{
        filteredDevices,
        selectedOrganization,
        setSelectedOrganization,
        organizationsForDropdown,
        devices,
        organizations,
        loading,
        error,
        refetchDevices: refetch,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};

export const useDeviceContext = (): DeviceContextProps => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error("useDeviceContext must be used within a DeviceProvider");
  }
  return context;
};
