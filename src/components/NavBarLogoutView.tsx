import React from "react";
import { Button } from "react-bootstrap";

interface NavBarLogoutViewProps {
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
}

export default function NavBarLogoutView({
  onLoginClicked,
  onSignUpClicked,
}: NavBarLogoutViewProps) {
  return (
    <>
      <Button
        className="hover:bg-[#423B34] hover:scale-105 transition-all border-none"
        onClick={onSignUpClicked}
      >
        Sign Up
      </Button>
      <Button
        className="hover:bg-[#423B34]  hover:scale-105 transition-all border-none"
        onClick={onLoginClicked}
      >
        Login
      </Button>
    </>
  );
}
