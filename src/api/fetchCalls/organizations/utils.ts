import { Organization } from "../../../types/device-types";

export const createOrganizationHeirachy = (data: Organization[]) =>
  data.reduce((acc: Organization[], item: Organization) => {
    if (!item.parent) {
      // If the item has no parent, it's a top-level organization
      acc.push({
        ...item,
        children: [],
      });
    } else {
      // If the item has a parent, find the parent in the existing organizations
      const parent = acc.find((org) => org.id === item.parent);
      if (parent) {
        if (!parent.children) {
          // Initialize children if it's undefined
          parent.children = [];
        }
        // Add the item as a child of its parent
        parent.children.push(item);
      }
    }
    return acc;
  }, []);
