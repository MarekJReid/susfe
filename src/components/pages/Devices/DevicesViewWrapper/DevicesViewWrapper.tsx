import { DevicesViewProps } from "../../../../types/component-types";
import DevicesView from "../DevicesView/DevicesView";

/**
 * @description This component is a wrapper for the DevicesView component, providing a container with styling and props.
 * @param {DevicesViewProps} props - The props for the DevicesViewWrapper component.
 * @param {string} props.viewMode - The view mode to be passed to the DevicesView component.
 * @returns {JSX.Element} The rendered DevicesViewWrapper component.
 * @author Marek Reid
 * @date 2nd September
 */

const DevicesViewWrapper = ({
  viewMode,
  devices,
  isLoading,
}: DevicesViewProps): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <DevicesView
        viewMode={viewMode}
        devices={devices}
        isLoading={isLoading}
      />
    </div>
  );
};

export default DevicesViewWrapper;
