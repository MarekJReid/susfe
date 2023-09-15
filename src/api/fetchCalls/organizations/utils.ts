import { Organization } from "../../../types/device-types";

export const createOrganizationHierarchy = (
  data: Organization[]
): Organization[] => {
  // map through data and see if the item has a parent (which is a reference of its itemId) if select it otherwise take the itemId
  const parentsArray = data.map((item) =>
    item.parent ? item.parent : item.id
  );
  const uniqueParentsArray = [...new Set(parentsArray)];
  // no remap through the data array and append the children to the parents
  // recurrsively go through the data and find the children of the parent and append them to the parent

  const modifiedArray = uniqueParentsArray.map((parentObj) => {
    const parent = data.find((item) => item.id === parentObj);
    const children = data
      .filter((item) => item.parent === parentObj)
      .map((item) => ({ id: item.id, displayName: item.displayName }));

    console.log("parentObj", parentObj, children);
    return;
  });

  console.log(modifiedArray);
};
