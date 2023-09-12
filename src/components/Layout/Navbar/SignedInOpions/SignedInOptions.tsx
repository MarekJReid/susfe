import { useAuth } from "../../../../hooks/useAuth";
import SignOutIcon from "../../../dynamic/SignOutIcon/SignOutIcon";
import UserIcon from "../../../dynamic/UserIcon/UserIcon";

export const SignedInOptions: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="flex">
      <UserIcon />
      {isAuthenticated && <SignOutIcon />}
    </div>
  );
};
