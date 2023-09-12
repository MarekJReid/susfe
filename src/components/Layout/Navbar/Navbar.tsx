import React from "react";

import { CompanyDetails } from "./CompanyDetails/CompanyDetails";
import { SignedInOptions } from "./SignedInOpions/SignedInOptions";

/**
 * Represents a navigation bar component.
 *
 * @returns {JSX.Element} The rendered Navbar component.
 * @auth Marek Reid
 * @date 2nd September 2023
 */

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-800 text-white w-full flex justify-between pl-6 pr-8  py-4">
      <CompanyDetails companyName="Software Update Service" />
      <SignedInOptions />
    </nav>
  );
};
