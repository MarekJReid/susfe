import { useContext } from "react";
import { DataContext } from "../contexts/GlobalContext"; // Update this path to where DataContext is defined
import { DataContextType } from "../types/general-purpose-types";

export const useData: () => DataContextType = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
