import React from "react";
import { useAuth } from "../../../hooks/useAuth";

interface SignOutIconProps {
  size?: number;
  color?: string;
}

const SignOutIcon: React.FC<SignOutIconProps> = ({
  size = 24,
  color = "white",
}) => {
  const { logout } = useAuth();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={logout}
    >
      <path
        d="M17 12L22 17M22 17L17 22M22 17H9M15 4H5C4.44772 4 4 4.44772 4 5V19C4 19.5523 4.44772 20 5 20H15C15.5523 20 16 19.5523 16 19V5C16 4.44772 15.5523 4 15 4Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SignOutIcon;
