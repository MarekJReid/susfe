import Heading from "../../../dynamic/Heading/Heading";
import CardIcon from "./Icons/CardIcon";
import IconWrapper from "./Icons/IconWrapper";
import TableIcon from "./Icons/TableIcon";
import Dropdown from "./OrganisationsFilterDropdown/OrganisationsFilterDropdown";

/**
 * DevicesNavBar component that allows switching between table and card views.
 * @param {DevicesNavBarProps} props - The props for the DevicesNavBar component.
 * @param {Function} props.onTableClick - Callback function for when the table view button is clicked.
 * @param {Function} props.onCardClick - Callback function for when the card view button is clicked.
 * @returns {JSX.Element} The rendered DevicesNavBar component.
 * @author Marek Reid
 * @date 2nd September 2023
 */
//Having troubles with types in another file here - setSelctedOrganization throws annoying error - to fix
export interface DevicesNavBarProps {
  onTableClick: () => void;
  onCardClick: () => void;
  setSelectedOrganization: React.Dispatch<React.SetStateAction<string | null>>; // Corrected type
  organisations: string[]; // Corrected type
}
const DevicesNavBar = ({
  onTableClick,
  onCardClick,
  setSelectedOrganization,
  organisations,
}: DevicesNavBarProps): JSX.Element => {
  const handleOrganizationSelect = (organization: string) => {
    setSelectedOrganization(organization);
  };

  console.log(organisations);

  return (
    <div className="flex justify-between items-center p-4  border text-primary">
      <Heading text={"Devices"} className="text-secondary text-2xl"></Heading>
      <Dropdown options={organisations} onSelect={handleOrganizationSelect} />
      <IconWrapper>
        <TableIcon onTableClick={onTableClick} />
        <CardIcon onCardClick={onCardClick} />
      </IconWrapper>
    </div>
  );
};
export default DevicesNavBar;
