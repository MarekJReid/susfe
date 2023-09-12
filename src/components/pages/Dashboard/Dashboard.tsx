import { DashboardProps } from "../../../types/component-types";
import Avatar from "./Avatar/Avatar";
import Title from "./Titles/Title";
import UserDetail from "./UserDetail/UserDetail";

/**
 * @description This component renders a dashboard displaying user details.
 * @param {DashboardProps} props - The props for the Dashboard component.
 * @param {object} props.userData - User data to be displayed in the dashboard.
 * @param {string} props.userData.mail - User's email address.
 * @param {string} props.userData.jobTitle - User's job title.
 * @param {string} props.userData.officeLocation - User's office location.
 * @param {string} props.userData.businessPhones - User's business phone number.
 * @param {string} props.userData.preferredLanguage - User's preferred language.
 * @param {string} props.userData.photo - User's photo.
 * @param {string} props.userData.givenName - User's given name.
 * @returns {JSX.Element} The rendered Dashboard component.
 * @author Marek Reid
 * @date 2nd September 2023
 */

const Dashboard = ({ userData }: DashboardProps): JSX.Element => {
  const {
    mail,
    jobTitle,
    officeLocation,
    businessPhones,
    preferredLanguage,
    photo,
    givenName,
  } = userData;
  return (
    <div className="flex pt-24 pl-24 flex flex-col">
      <Avatar photo={photo} />
      <Title givenName={givenName} />
      <UserDetail label="Email" value={mail} />
      <UserDetail label="Job Title" value={jobTitle} />
      <UserDetail label="Office Location" value={officeLocation} />
      <UserDetail label="Phone" value={businessPhones[0]} />
      <UserDetail label="Preferred Language" value={preferredLanguage} />
    </div>
  );
};

export default Dashboard;
