import { ReactNode } from "react";
import { UserData } from "./user-types";
import { Device } from "./device-types";

export interface SidebarProps {
  items: string[];
  onSelectItem?: (item: string) => void;
}

export interface DevicesNavBarProps {
  onTableClick: () => void;
  onCardClick: () => void;
  setSelectedOrganization: (organizationId: string | null) => void;
  organisations: string[];
}

export interface HeadingProps {
  text: string;
  className?: string;
}

export interface DashboardProps {
  userData: UserData;
}
export interface TitleProps {
  givenName: string;
}

export interface UserDetailProps {
  label: string;
  value: string | null | undefined;
}

export interface AvatarProps {
  photo: string;
}

export interface TableIconProps {
  onTableClick: () => void;
}
export interface CardIconProps {
  onCardClick: () => void;
}

export interface IconWrapperProps {
  children: ReactNode;
}

export interface LayoutProps {
  children: ReactNode;
}

export interface DevicesViewProps {
  viewMode: "table" | "card";
  isLoading: boolean;
  devices: Device[];
}

export interface ViewSwitchProps {
  viewMode: "table" | "card"; // Define the available view modes
  element: string; // The name of the element to be wrapped
  children: ReactNode;
}

export interface DropdownProps {
  options: string[];
  onSelect: (option: string) => void;
}

/**
 * Props for the Table component.
 *
 * @template T - The type of data in the table.
 * @property {T[]} data - The data to display in the table.
 * @property {{ [key in keyof T]?: (item: T[key]) => JSX.Element | undefined }} renderers -
 *   Optional custom renderers for specific columns.
 * @property {{ [key in keyof T]?: string }} headers - Optional column headers.
 */

export interface TableProps<T> {
  data: T[];
  renderers?: { [key in keyof T]?: (item: T[key]) => JSX.Element | undefined };
  headers?: { [key in keyof T]?: string };
}

export interface SidebarLinkProps {
  to: string;
  children: ReactNode;
}
