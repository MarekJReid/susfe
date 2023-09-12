import { ReactNode } from "react";

export interface UserData {
  "@odata.context": string;
  id: string;
  businessPhones: string[];
  displayName: string;
  givenName: string;
  jobTitle: string;
  mail: string;
  mobilePhone: string | null;
  officeLocation: string;
  preferredLanguage: string;
  surname: string;
  userPrincipalName: string;
  photo: string;
}

export interface SignedIn {
  isSignedIn: boolean;
}

export interface ProtectedRouteProps {
  isAuthenticated: boolean | undefined;
  children: ReactNode;
}
