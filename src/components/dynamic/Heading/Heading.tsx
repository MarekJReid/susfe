/**
 * @file Heading component for displaying text headings.
 * @date 2nd September 2023
 * @author Marek Reid
 */

import React from "react";
import { HeadingProps } from "../../../types/component-types";

/**
 * Dynamic heading component that displays a text heading.
 * @param {HeadingProps} props - The props for the Heading component.
 * @param {string} props.text - The text to be displayed as the heading.
 * @param {string} [props.className] - Additional CSS classes for styling the heading.
 * @returns {JSX.Element} The rendered Heading component.
 */
const Heading: React.FC<HeadingProps> = ({ text, className }) => {
  return <h1 className={className}>{text}</h1>;
};

export default Heading;
