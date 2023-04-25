import React from "react";
import { Button, Navbar } from "react-bootstrap";
import { user } from "../model/user";
import { logOut } from "../network/not_api";

interface NavBarLoginViewProps {
  user: user;
  onLogoutSuccesful: () => void;
}

export default function NavBarLoginView({
  user,
  onLogoutSuccesful,
}: NavBarLoginViewProps) {
  async function Logout() {
    try {
      await logOut();
      onLogoutSuccesful();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar.Text className="m-2">Signed in as {user.username}</Navbar.Text>
      <Button className=" hover:bg-white hover:text-black" onClick={Logout}>
        Logout
      </Button>
    </>
  );
}
