import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { LayoutProps } from "../../types/component-types";
import { Navbar } from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return (
    <div className=" bg-gray-100 ">
      <Navbar />

      <main className="flex relative">
        {isAuthenticated && <Sidebar items={["devices"]} />}
        {children}
      </main>
    </div>
  );
};
