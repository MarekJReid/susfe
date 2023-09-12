/**
 * @description This component renders a table icon button for switching between table and card views.
 * @param {Function} onTableClick - Callback function to handle the table view button click event.
 * @param {Function} onCardClick - Callback function to handle the card view button click event.
 * @returns {JSX.Element} The rendered Table component.
 * @author Marek Reid
 * @date 2nd September 2023
 */

import React from "react";
import { TableIconProps } from "../../../../../types/component-types";

const TableIcon: React.FC<TableIconProps> = ({ onTableClick }) => {
  return (
    <button onClick={onTableClick}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="gray"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3 3C2.44772 3 2 3.44772 2 4V20C2 20.5523 2.44772 21 3 21H21C21.5523 21 22 20.5523 22 20V4C22 3.44772 21.5523 3 21 3H3ZM10 5H20V7H10V5ZM4 5H9V7H4V5ZM4 8H9V10H4V8ZM10 8H20V10H10V8ZM10 11H20V13H10V11ZM4 11H9V13H4V11ZM4 14H9V16H4V14ZM10 14H20V16H10V14ZM10 17H20V19H10V17ZM4 17H9V19H4V17Z"
          fill="gray"
        />
      </svg>
    </button>
  );
};

export default TableIcon;
