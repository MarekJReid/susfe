import React, { useState } from "react";
import DevicesNavBar from "./DevicesNavBar/DevicesNavBar";
import DevicesViewWrapper from "./DevicesViewWrapper/DevicesViewWrapper";
import { fetchDevices } from "../../../api/api";
import { useQuery } from "react-query";
import useUniqueOrganizations from "../../../hooks/useUniqueOrganizations";
import useFilteredDevices from "../../../hooks/useOrganisationFilterForDevices";

/**
 * Represents the main Devices page, allowing users to switch between table and card views and filter devices by organization.
 * @returns {JSX.Element} The rendered Devices component.
 * @author Marek Reid
 * @date 2nd September 2023
 */

const Devices: React.FC = () => {
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [selectedOrganization, setSelectedOrganization] = useState<
    string | null
  >(null);
  const { data: devices, isLoading } = useQuery("devices", fetchDevices);

  const organisations = useUniqueOrganizations(devices || []);
  const filteredDevices = useFilteredDevices(
    devices || [],
    selectedOrganization
  );

  return (
    <div className="relative w-full">
      <DevicesNavBar
        onTableClick={() => setViewMode("table")}
        onCardClick={() => setViewMode("card")}
        organisations={organisations}
        setSelectedOrganization={setSelectedOrganization}
      />
      <DevicesViewWrapper
        viewMode={viewMode}
        devices={filteredDevices}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Devices;
