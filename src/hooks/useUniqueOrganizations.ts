import { useEffect, useState } from "react";

/**
 * Custom hook to extract unique organizations from an array of devices.
 *
 * @param {Array<{ organizations?: Array<string | null> | undefined }>} devices - An array of devices containing organizations.
 * @returns {string[]} An array of unique organization names extracted from the devices.
 *
 * @example
 * // Example usage of useUniqueOrganizations custom hook:
 * const uniqueOrganizations = useUniqueOrganizations(devices);
 * @author Marek Reid
 * @date 2nd September 2023
 */
function useUniqueOrganizations(
  devices: Array<{ organizations?: Array<string | null> | undefined }>
): string[] {
  // State to store unique organizations
  const [uniqueOrganizations, setUniqueOrganizations] = useState<string[]>([]);

  useEffect(() => {
    if (devices) {
      // Create a Set to ensure uniqueness of organization names
      const organizationsSet = new Set<string>();

      devices.forEach((device) => {
        if (device.organizations && Array.isArray(device.organizations)) {
          device.organizations.forEach((organization) => {
            if (organization) {
              organizationsSet.add(organization);
            }
          });
        }
      });

      // Convert the Set back to an array
      const uniqueOrganizationsArray = Array.from(organizationsSet);

      // Update the state with unique organizations
      setUniqueOrganizations(uniqueOrganizationsArray);
    }
  }, [devices]);

  return uniqueOrganizations;
}

export default useUniqueOrganizations;
