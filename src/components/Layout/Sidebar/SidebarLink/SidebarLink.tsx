import { Link } from "react-router-dom";
import { SidebarLinkProps } from "../../../../types/component-types";

/**
 * Represents a sidebar link component.
 *
 * @param {SidebarLinkProps} props - The props for the SidebarLink component.
 * @param {string} props.to - The target URL for the link.
 * @param {React.ReactNode} props.children - The content to be displayed as the link.
 * @returns {JSX.Element} The rendered SidebarLink component.
 * @author Marek Reid
 * @date 2nd September 2023
 */

export const SidebarLink = ({ to, children }: SidebarLinkProps) => {
  return (
    <div className="relative inline-block">
      <Link
        to={to}
        className="transition-all duration-300 ease-out text-white hover:text-gray-300 relative overflow-hidden group"
      >
        {children}
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
      </Link>
    </div>
  );
};

export default SidebarLink;
