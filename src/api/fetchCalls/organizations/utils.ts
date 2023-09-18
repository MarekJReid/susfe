import { Organization } from "../../../types/device-types";

export const createOrganizationHierarchy = (
  data: Organization[]
): Organization[] => {
  // map through data and see if the item has a parent (which is a reference of its itemId) if select it otherwise take the itemId
  // const parentsArray = data.map((item) =>
  //   item.parent ? item.parent : item.id
  // );
  // const uniqueParentsArray = [...new Set(parentsArray)];
  // // no remap through the data array and append the children to the parents
  // // recurrsively go through the data and find the children of the parent and append them to the parent

  // const modifiedArray = uniqueParentsArray.map((parentObj) => {
  //   const parent = data.find((item) => item.id === parentObj);
  //   const children = data
  //     .filter((item) => item.parent === parentObj)
  //     .map((item) => ({ id: item.id, displayName: item.displayName }));

  //   console.log("parentObj", parentObj, children);
  //   return;
  // });

  const parents: Organization[] = [];

  // Step 1: Filter out organizations with no parent and push to parents array
  data.forEach((item) => {
    if (!item.parent) {
      parents.push({
        id: item.id,
        displayName: item.displayName,
        children: [],
      });
    }
  });

  // Now, iterate through the data array again
  data.forEach((item) => {
    if (item.parent) {
      // Check if this parent already exists in the parents array
      const parentExists = parents.some((parent) => parent.id === item.parent);

      // If the parent doesn't exist in the parents array, add it
      if (!parentExists) {
        const parentItem = data.find((d) => d.id === item.parent);
        if (parentItem) {
          parents.push({
            id: parentItem.id,
            displayName: parentItem.displayName,
            children: [], // Assuming you want to initialize children as an empty array
          });
        }
      }
    }
  });

  // Step 2: For organizations with a parent in the parents array, add them as children
  data.forEach((item) => {
    if (item.parent) {
      const parent = parents.find((p) => p.id === item.parent);

      if (parent) {
        parent.children?.push({
          id: item.id,
          displayName: item.displayName,
          children: [],
        });
        // update the parents array with the new parent
        const index = parents.findIndex((p) => p.id === item.parent);

        parents[index] = parent;
      }
    }
  });

  // Step 3: For remaining organizations, if their parent exists as a child, add them as children to that child
  data.forEach((item) => {
    parents.forEach((parent) => {
      const child = parent.children?.find((c) => c.id === item.parent);
      if (child) {
        if (!child.children) {
          child.children = [];
        }
        child.children.push({
          id: item.id,
          displayName: item.displayName,
        });
      }
    });
  });

  return parents;
};
