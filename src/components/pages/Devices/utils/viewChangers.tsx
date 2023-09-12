// viewChangers.ts

/**
 * Function to switch the view mode to table view.
 *
 * @param {React.Dispatch<React.SetStateAction<"table" | "card">} setViewMode - The state setter function for the view mode.
 *
 * @example
 * // Example usage to switch to table view:
 * switchToTableView(setViewMode);
 *
 * @author Marek Reid
 * @date September 8, 2023
 */
export const switchToTableView = (
  setViewMode: React.Dispatch<React.SetStateAction<"table" | "card">>
) => {
  setViewMode("table");
};

/**
 * Function to switch the view mode to card view.
 *
 * @param {React.Dispatch<React.SetStateAction<"table" | "card">} setViewMode - The state setter function for the view mode.
 *
 * @example
 * // Example usage to switch to card view:
 * switchToCardView(setViewMode);
 *
 * @author Marek Reid
 * @date September 8, 2023
 */
export const switchToCardView = (
  setViewMode: React.Dispatch<React.SetStateAction<"table" | "card">>
) => {
  setViewMode("card");
};
