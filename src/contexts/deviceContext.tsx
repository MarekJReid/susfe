import React, { ReactNode, createContext, useContext } from "react";
import useFetchDevices from "../api/fetchCalls/useFetchDevices";
import { Device } from "../types/device-types";

interface DeviceContextProps {
  devices: Device[];
  loadingDevices: boolean;
  errorDevices: string | null;
}

const DeviceContext = createContext<DeviceContextProps | undefined>(undefined);

interface DeviceProviderProps {
  children: ReactNode;
}

export const DeviceProvider: React.FC<DeviceProviderProps> = ({ children }) => {
  // const { devices, loadingDevices, errorDevices } = useFetchDevices();
  const devices: never[] = [];
  const loadingDevices = false;
  const errorDevices = null;
  return (
    <DeviceContext.Provider
      value={{
        devices,

        loadingDevices,
        errorDevices,
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
