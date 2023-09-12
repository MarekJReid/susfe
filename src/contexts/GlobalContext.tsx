import React, { createContext } from "react";
import { useQuery } from "react-query";
import { fetchDevices, fetchJobs, fetchManifests } from "../api/api"; // assuming api.ts is in the same directory
import { DataContextType } from "../types/general-purpose-types";

export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

type DataProviderProps = {
  children: React.ReactNode;
};

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const { data: devices = [] } = useQuery("devices", fetchDevices);
  const { data: jobs = [] } = useQuery("jobs", fetchJobs);
  const { data: manifests = [] } = useQuery("manifests", fetchManifests);

  return (
    <DataContext.Provider value={{ devices, jobs, manifests }}>
      {children}
    </DataContext.Provider>
  );
};
