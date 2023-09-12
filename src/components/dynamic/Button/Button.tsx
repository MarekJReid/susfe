// Button.tsx
import React from "react";

interface ButtonProps {
  bg: string; // e.g., 'bg-blue-500'
  text: string; // e.g., 'text-white'
  fontSize: string;
  label: string; // e.g., 'Logout',
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  bg,
  fontSize,
  text,
  label,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-green-800 text-${text} text-${fontSize} hover:${bg}-dark transform scale-100 hover:scale-105 translate-y-2 transition-transform duration-300 ease-in-out  hover:${text}-dark py-4 px-16 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1`}
    >
      {label}
    </button>
  );
};

export default Button;
