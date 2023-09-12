/**
 * @description This component renders a user avatar.
 * @param {AvatarProps} props - The props for the Avatar component.
 * @param {string} props.photo - The URL of the user's photo to be displayed as the avatar.
 * @returns {JSX.Element} The rendered Avatar component.
 * @author Marek Reid
 * @date 2nd September 2023
 */

import { AvatarProps } from "../../../../types/component-types";

const Avatar = ({ photo }: AvatarProps) => {
  return (
    <div className="rounded-full overflow-hidden w-36 h-36 mr-4">
      <img
        src={photo}
        alt="User Avatar"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Avatar;
