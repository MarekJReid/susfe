import { UserDetailProps } from "../../../../types/component-types";

/**
 * @description This component displays a user detail as a label-value pair.
 * @param {UserDetailProps} props - The props for the UserDetail component.
 * @param {string} props.label - The label for the user detail.
 * @param {string} props.value - The value of the user detail.
 * @returns {JSX.Element} The rendered UserDetail component.
 * @author Marek Reid
 * @date 2nd September 2023
 */

const UserDetail = ({ label, value }: UserDetailProps): JSX.Element => {
  return (
    <p className="text-secondary">
      <strong>{label}:</strong> {value || "N/A"}
    </p>
  );
};

export default UserDetail;
