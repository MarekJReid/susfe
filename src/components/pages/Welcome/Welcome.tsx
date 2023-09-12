// Welcome.tsx

import React from "react";

import { useNavigate } from "react-router-dom";
import { handleLogin } from "./utils/handleLogin";
import Heading from "../../dynamic/Heading/Heading";
import Button from "../../dynamic/Button/Button";
import { useAuth } from "../../../hooks/useAuth";

interface WelcomeProps {
  welcomeMessage: string;
}

export const Welcome: React.FC<WelcomeProps> = ({ welcomeMessage }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleLoginClick = handleLogin(login, navigate);
  return (
    <div className="flex justify-center items-center w-screen h-[92vh] flex-col">
      <Heading
        className={"text-6xl font-bold mb-8 text-secondary"}
        text={welcomeMessage}
      />
      <Button
        onClick={handleLoginClick}
        bg={"green-800"}
        text="white"
        fontSize="2xl"
        label="Sign In"
      />
    </div>
  );
};
