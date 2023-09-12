import React from "react";
import SidebarLink from "./SidebarLink/SidebarLink";
import { SidebarProps } from "../../../types/component-types";

/**
 * Sidebar component that displays a navigation menu.
 * @param {SidebarProps} props - The props for the Sidebar component.
 * @returns {JSX.Element} The rendered Sidebar component.
 * @author Marek Reid
 * @date 2/8/23
 */
const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  return (
    <div className="w-64  bg-blue-800 text-white h-screen">
      <div className="flex flex-col p-6 space-y-4 ">
        {items.map((item, index) => (
          <SidebarLink to={item} key={index}>
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </SidebarLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
