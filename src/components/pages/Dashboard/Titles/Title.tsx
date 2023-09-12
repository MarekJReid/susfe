import { TitleProps } from "../../../../types/component-types";

/**
 * @description This component renders a title section with a welcome message and user details.
 * @param {TitleProps} props - The props for the Title component.
 * @param {string} props.givenName - The given name of the user to be displayed in the title.
 * @returns {JSX.Element} The rendered Title component.
 * @author Marek Reid
 * @date 2nd September 2023
 */
const Title = ({ givenName }: TitleProps): JSX.Element => {
  return (
    <div className="mt-8">
      <h1 className="text-4xl  text-secondary">
        <span className="font-bold text-secondary">Welcome </span>
        {"" + givenName}
      </h1>
      <h3 className="text-2xl font-semibold text-secondary">Your Details:</h3>
    </div>
  );
};

export default Title;
