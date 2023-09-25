import React from "react";
import { Organization } from "../../../types/device-types";

interface RecursiveComponentProps {
  organization: Organization;
  handleOptionSelect: (option: string) => void | undefined;
}

const RecurssiveListElement: React.FC<RecursiveComponentProps> = ({
  organization,
  handleOptionSelect,
}) => {
  if (organization != undefined)
    return (
      <div
        onClick={() =>
          handleOptionSelect(organization.id ? organization.id : "")
        }
      >
        <p className="m-6">{organization && organization.displayName}</p>
        {organization.children && organization.children.length > 0 && (
          <span className="pl-4 flex pr-6 mt-6">
            -
            {organization.children.map((organization) => (
              <RecurssiveListElement
                key={organization.id}
                organization={organization}
                handleOptionSelect={handleOptionSelect}
              />
            ))}
          </span>
        )}
      </div>
    );
};

export default RecurssiveListElement;
