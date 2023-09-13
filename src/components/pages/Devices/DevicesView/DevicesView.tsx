import { CardGrid } from "../../../dynamic/CardGrid/CardGrid";

import { DevicesViewProps } from "../../../../types/component-types";

import LoadingSpinner from "../../../dynamic/Spinner/Spinner";
import { Table } from "../../../dynamic/table/Table";
import ViewSwitch from "./ViewSwitchWrapper/ViewSwitchWrapper";
import useFilteredDevices from "../../../../hooks/useOrganisationFilterForDevices";
import { useDeviceContext } from "../../../../contexts/deviceContext";
import { useOrganizationContext } from "../../../../contexts/organizationsContext";
/**
 * Renders a view of devices in either table or card grid format based on the viewMode prop.
 *
 * @param {DevicesViewProps} props - The props for the DevicesView component.
 * @param {string} props.viewMode - The current view mode ("table" or "card").
 *
 * @returns {JSX.Element} The rendered DevicesView component.
 *

 *
 * @author Marek Reid
 * @date 2nd September 2023
 */

const DevicesView = ({
  viewMode,
  isLoading,
}: DevicesViewProps): JSX.Element => {
  const { devices } = useDeviceContext();
  const { selectedOrganization } = useOrganizationContext();
  const filteredDevices = useFilteredDevices(devices, selectedOrganization);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="relative w-full">
      {devices && (
        <>
          <ViewSwitch element="table" viewMode={viewMode}>
            <Table
              data={filteredDevices}
              renderers={{
                lastActivity: (dateString: string) => (
                  <span>{new Date(dateString).toLocaleDateString()}</span>
                ),
              }}
            />
          </ViewSwitch>

          <ViewSwitch element="card" viewMode={viewMode}>
            <CardGrid
              data={filteredDevices}
              renderers={{
                lastActivity: (dateString: string) => (
                  <span>{new Date(dateString).toLocaleDateString()}</span>
                ),
              }}
            />
          </ViewSwitch>
        </>
      )}
    </div>
  );
};

export default DevicesView;
