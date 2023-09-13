import React from "react";
import { Organization } from "../../../types/device-types";

interface RecursiveComponentProps {
  organisation: Organization;
}

const RecurssiveListElement: React.FC<RecursiveComponentProps> = ({
  organisation,
}) => {
  return (
    <div>
      <p className="pb-">{organisation.displayName}</p>
      {organisation.children && organisation.children.length > 0 && (
        <span className="pl-4 flex pr-6 mt-6">
          {" "}
          -
          {organisation.children.map((organisation) => (
            <RecurssiveListElement
              key={organisation.id}
              organisation={organisation}
            />
          ))}
        </span>
      )}
    </div>
  );
};

export default RecurssiveListElement;