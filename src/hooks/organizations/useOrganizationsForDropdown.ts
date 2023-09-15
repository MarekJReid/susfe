import { Device, Organization } from "../../types/device-types";

export function computeUniqueOrganizationsForDropdown(
  devices: Device[],
  organizations: unknown[]
): unknown[] {
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

  // Recursively filter the organizations array
  const filterOrganizations = (
    organizations: unknown[],
    orgIds: string | unknown[]
  ) => {
    return organizations.filter((org) => {
      if (orgIds.includes(org.id)) {
        return true;
      }
      if (org.children) {
        org.children = filterOrganizations(org.children, orgIds);
        return org.children.length > 0;
      }
      return false;
    });
  };

  const filteredOrganizations = filterOrganizations(
    organizations,
    uniqueOrgIds
  );

  console.log("filtered orgs", filteredOrganizations);
}
