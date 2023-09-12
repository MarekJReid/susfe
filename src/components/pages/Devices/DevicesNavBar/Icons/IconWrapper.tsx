/**
 * @description This component is a wrapper for the icons to keep them right aligned.
 * @param {IconWrapperProps} props - The props for the IconWrapper component.
 * @param {string} props.label - The label for the user detail.
 * @param {string} props.value - The value of the user detail.
 * @returns {JSX.Element} The rendered IconWrapper component.
 * @author Marek Reid
 * @date 2nd September 2023
 */

import { IconWrapperProps } from "../../../../../types/component-types";

const IconWrapper = ({ children }: IconWrapperProps): JSX.Element => {
  return <div className="space-x-4">{children}</div>;
};

export default IconWrapper;
