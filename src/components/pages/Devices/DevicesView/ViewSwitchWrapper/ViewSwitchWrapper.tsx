import React from "react";
import { ViewSwitchProps } from "../../../../../types/component-types";

const ViewSwitch: React.FC<ViewSwitchProps> = ({
  viewMode,
  children,
  element,
}) => {
  const shouldShow = viewMode === element;

  return (
    <div
      className={`absolute top-0 left-0 w-full transition-opacity duration-500 ${
        shouldShow ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
};

export default ViewSwitch;
