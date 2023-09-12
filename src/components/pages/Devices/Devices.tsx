import React from "react";
import { useDeviceContext } from "../../../contexts/deviceContext";
import DevicesNavBar from "./DevicesNavBar/DevicesNavBar";
import useFetchDevices from "../../../api/fetchCalls/useFetchDevices";
import useFetchOrganizations from "../../../api/fetchCalls/useFetchOrganizations";

/**
 * Represents the main Devices page, allowing users to switch between table and card views and filter devices by organization.
 * @returns {JSX.Element} The rendered Devices component.
 * @author Marek Reid
 * @date 2nd September 2023
 */

const Devices: React.FC = () => {
  // const [viewMode, setViewMode] = useState<"table" | "card">("table");
  // const [selectedOrganization, setSelectedOrganization] = useState<
  //   string | null
  // >(null);

  // const organisations = useUniqueOrganizations(devices || []);
  // const filteredDevices = useFilteredDevices(
  //   devices || [],
  //   selectedOrganization
  // );
  const { organizationsForDropdown, setSelectedOrganization } =
    useDeviceContext();

  return (
    <div className="relative w-full">
      <DevicesNavBar
        onTableClick={() => setViewMode("table")}
        onCardClick={() => setViewMode("card")}
        organisations={organizationsForDropdown}
        setSelectedOrganization={setSelectedOrganization}
      />
      {/*
      <DevicesViewWrapper
        viewMode={viewMode}
        devices={filteredDevices}
        isLoading={isLoading}
      /> */}
    </div>
  );
};

export default Devices;
