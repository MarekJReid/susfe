// UserIcon.tsx
import React from "react";
import { Link } from "react-router-dom";

interface UserIconProps {
  size?: number;
  color?: string;
}

const UserIcon: React.FC<UserIconProps> = ({ size = 24, color = "white" }) => {
  return (
    <Link to="/dashboard">
      <svg
        className="mr-2"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 14C15.3137 14 18 16.6863 18 20V21H6V20C6 16.6863 8.68629 14 12 14ZM4 20V21C4 21.5304 4.21071 22.0391 4.58579 22.4142C4.96086 22.7893 5.46957 23 6 23H18C18.5304 23 19.0391 22.7893 19.4142 22.4142C19.7893 22.0391 20 21.5304 20 21V20C20 17.7909 19.1046 15.7842 17.5528 14.7412C15.9974 13.6967 13.9996 13 12 13C10.0004 13 8.00258 13.6967 6.44724 14.7412C4.89538 15.7842 4 17.7909 4 20ZM12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12ZM12 6C13.1046 6 14 6.89543 14 8C14 9.10457 13.1046 10 12 10C10.8954 10 10 9.10457 10 8C10 6.89543 10.8954 6 12 6Z"
          fill={color}
        />
      </svg>
    </Link>
  );
};

export default UserIcon;
