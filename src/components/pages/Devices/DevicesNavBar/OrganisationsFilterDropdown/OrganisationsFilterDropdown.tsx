import React, { useState, useRef, useEffect } from "react";
import { DropdownProps } from "../../../../../types/component-types";

/**
 * Dropdown component for selecting options.
 *
 * @param {DropdownProps} props - The props for the Dropdown component.
 * @param {string[]} props.options - The array of options to be displayed.
 * @param {(option: string) => void} props.onSelect - Callback function to be called when an option is selected.
 * @returns {JSX.Element} The rendered Dropdown component.
 *
 */

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownHeight, setDropdownHeight] = useState("0px");
  const dropdownRef = useRef<HTMLUListElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: string) => {
    onSelect(option);
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
        className="absolute z-10 mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-md overflow-hidden"
        style={{
          maxHeight: dropdownHeight,
          transition: "max-height 0.3s ease-in-out",
        }}
      >
        {options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className="px-4 py-2 cursor-pointer hover:bg-blue-100"
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
