import { useEffect, useRef, useState } from "react";
import { useOrganizationContext } from "../../../../../contexts/organizationsContext";
import RecurssiveListElement from "../../../../dynamic/RecurssiveListElement/RecurssiveListElement";
import { Organization } from "../../../../../types/device-types";

/**
 * Dropdown component for selecting options.
 *
 * @param {DropdownProps} props - The props for the Dropdown component.
 * @param {string[]} props.options - The array of options to be displayed.
 * @param {(option: string) => void} props.onSelect - Callback function to be called when an option is selected.
 * @returns {JSX.Element} The rendered Dropdown component.
 *
 */

function Dropdown(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownHeight, setDropdownHeight] = useState("0px");
  const dropdownRef = useRef<HTMLUListElement | null>(null);

  const { organizationsForDropdown } = useOrganizationContext();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const { setSelectedOrganization } = useOrganizationContext();

  const handleOptionSelect = (option: string) => {
    console.log("option", option);
    setSelectedOrganization(option);
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const height = `${dropdownRef.current.scrollHeight}px`;
      setDropdownHeight(height);
    } else {
      setDropdownHeight("0px");
    }
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="text-secondary font-medium focus:outline-none flex items-center"
      >
        Filter by organization
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ml-2 transition-transform transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <ul
        ref={dropdownRef}
        className="absolute z-10 mt-2  w-[auto] bg-white border border-gray-300 shadow-lg rounded-md overflow-hidden"
        style={{
          maxHeight: dropdownHeight,
          transition: "max-height 0.3s ease-in-out",
        }}
      >
        {organizationsForDropdown?.map((organization: Organization) => (
          <div className="p-8">
            {organization === "undefined" ? (
              <p
                className="p-6"
                onClick={() => handleOptionSelect("undefined")}
              >
                Undefined
              </p>
            ) : (
              <RecurssiveListElement
                key={organization.id}
                organization={organization}
                handleOptionSelect={handleOptionSelect}
              />
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Dropdown;
