import { Device, Organization } from "../../types/device-types";

export function computeUniqueOrganizationsForDropdown(
  devices: Device[],
  organizations: Organization[]
): Organization[] {
  const uniqueOrgIds = devices.reduce<string[]>((acc, device) => {
    if (device.organizations) {
      device.organizations.forEach((orgId: string) => {
        if (!acc.includes(orgId)) {
          acc.push(orgId);
        }
      });
    } else if (!acc.includes("undefined")) {
      acc.push("undefined");
    }
    return acc;
  }, []);

  return uniqueOrgIds.map((orgId) => {
    const organization = organizations.find((org) => org.id === orgId);
    if (organization) {
      return organization;
    } else {
      return {
        id: orgId,
        displayName: orgId,
      };
    }
  });
}
