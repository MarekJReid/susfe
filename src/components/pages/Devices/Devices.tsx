import React, { useState } from "react";
import { useDeviceContext } from "../../../contexts/deviceContext";
import DevicesNavBar from "./DevicesNavBar/DevicesNavBar";
import { useOrganizationContext } from "../../../contexts/organizationsContext";
import DevicesViewWrapper from "./DevicesViewWrapper/DevicesViewWrapper";
import LoadingSpinner from "../../dynamic/Spinner/Spinner";

/**
 * Represents the main Devices page, allowing users to switch between table and card views and filter devices by organization.
 * @returns {JSX.Element} The rendered Devices component.
 * @author Marek Reid
 * @date 2nd September 2023
 */

const Devices: React.FC = () => {
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const { organizationsForDropdown, selectedOrganization } =
    useOrganizationContext();

  const { devices, loadingDevices } = useDeviceContext();

  console.log("selectedOrganization", selectedOrganization);

  if (loadingDevices) return <LoadingSpinner />;

  return (
    <div className="relative w-full">
      {organizationsForDropdown !== null && (
        <DevicesNavBar
          onTableClick={() => setViewMode("table")}
          onCardClick={() => setViewMode("card")}
        />
      )}
      <DevicesViewWrapper
        viewMode={viewMode}
        devices={devices}
        isLoading={loadingDevices}
      />{" "}
    </div>
  );
};

export default Devices;
