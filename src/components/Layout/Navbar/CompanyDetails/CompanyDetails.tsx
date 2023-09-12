import { Link } from "react-router-dom";
import CuteComputerLogo from "../../../../assets/companyLogo";
import Heading from "../../../dynamic/Heading/Heading";
import { useAuth } from "../../../../hooks/useAuth";

interface CompanyDetailsProps {
  companyName: string;
}

export const CompanyDetails: React.FC<CompanyDetailsProps> = ({
  companyName,
}) => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="flex items-center">
      <CuteComputerLogo />
      <Link to={isAuthenticated ? "/devices" : "/"}>
        <Heading text={companyName} className="pl-4" />
      </Link>
    </div>
  );
};
