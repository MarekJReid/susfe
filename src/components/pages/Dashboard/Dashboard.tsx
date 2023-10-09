import { useEffect, useState } from "react";
import { DashboardProps } from "../../../types/component-types";
import Avatar from "./Avatar/Avatar";
import Title from "./Titles/Title";
import UserDetail from "./UserDetail/UserDetail";
import useFetchUserData from "../../../api/fetchCalls/useFetchUserData";
import Cookies from "js-cookie";
import { useAuth } from "../../../hooks/useAuth";
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

const Dashboard = (): JSX.Element => {
  const { userData } = useAuth();

  const { mail, preferredLanguage, jobTitle, businessPhones, officeLocation } =
    userData;
  return (
    <div className="flex pt-24 pl-24 flex flex-col">
      <Title givenName={userData.givenName} />
      <UserDetail label="Email" value={mail} />
      <UserDetail label="Preferred Language" value={preferredLanguage} />
      <UserDetail label="Job Title" value={jobTitle} />
      <UserDetail label="Phone" value={businessPhones[0]} />
      <UserDetail label="Office Location" value={officeLocation} />
      {/* <Avatar photo={photo} />
      
     
      
      <UserDetail label="Office Location" value={officeLocation} />
      */}
    </div>
  );
};

export default Dashboard;
