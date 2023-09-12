/**
 * @description This component renders a Card icon button for switching between Card and card views.
 * @param {Function} onCardClick - Callback function to handle the Card view button click event.
 * @param {Function} onCardClick - Callback function to handle the card view button click event.
 * @returns {JSX.Element} The rendered Card component.
 * @author Marek Reid
 * @date 2nd September 2023
 */

import React from "react";
import { CardIconProps } from "../../../../../types/component-types";

const CardIcon: React.FC<CardIconProps> = ({ onCardClick }) => {
  return (
    <button onClick={onCardClick}>
      <svg
        width="25"
        height="25"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 4C2.44772 4 2 4.44772 2 5V19C2 19.5523 2.44772 20 3 20H21C21.5523 20 22 19.5523 22 19V5C22 4.44772 21.5523 4 21 4H3ZM7 8C7.55228 8 8 7.55228 8 7C8 6.44772 7.55228 6 7 6C6.44772 6 6 6.44772 6 7C6 7.55228 6.44772 8 7 8ZM7 10C6.44772 10 6 10.4477 6 11C6 11.5523 6.44772 12 7 12H17C17.5523 12 18 11.5523 18 11C18 10.4477 17.5523 10 17 10H7ZM7 14C6.44772 14 6 14.4477 6 15C6 15.5523 6.44772 16 7 16H17C17.5523 16 18 15.5523 18 15C18 14.4477 17.5523 14 17 14H7Z"
          fill="none"
          stroke="gray"
          strokeWidth="1"
        />
      </svg>
    </button>
  );
};

export default CardIcon;
