import { useEffect, useState } from "react";

/**
 * Custom hook to filter devices based on the selected organization.
 *
 * @param {Device[] | undefined} devices - An array of devices to filter.
 * @param {string | null} selectedOrganization - The selected organization for filtering.
 * @returns {Device[] | undefined} An array of filtered devices based on the selected organization.
 *
 * @example
 * // Example usage of useFilteredDevices custom hook:
 * const filteredDevices = useFilteredDevices(devices, selectedOrganization);
 *
 * @author Marek Reid
 * @date 8th September 2023
 */
const useFilteredDevices = (
  devices: Device[],
  selectedOrganization: string | null
) => {
  // State to store filtered devices
  const [filteredDevices, setFilteredDevices] = useState<Device[]>(devices);

  useEffect(() => {
    if (devices && selectedOrganization !== null) {
      // Filter devices based on selected organization
      const filteredDevices = devices.filter(
        (device) =>
          Array.isArray(device.organizations) &&
          device.organizations.includes(selectedOrganization)
      );
      setFilteredDevices(filteredDevices);
    } else {
      // If no organization is selected, set filtered devices to the original devices
      setFilteredDevices(devices);
    }
  }, [devices, selectedOrganization]);

  return filteredDevices;
};

export default useFilteredDevices;

// Define the Device interface here
interface Device {
  organizations: string[]; // Adjust this type according to your actual data structure
  // Add other properties as needed
}
