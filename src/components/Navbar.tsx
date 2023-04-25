import React from "react";
import { user } from "../model/user";
import { Nav, Navbar } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import NavBarLoginView from "./NavBarLoginView";
import NavBarLogoutView from "./NavBarLogoutView";
import { Link } from "react-router-dom";

interface NavbarProps {
  loggedInUser: user | null;
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
  onLogoutSuccesful: () => void;
}

export default function NavBar({
  loggedInUser,
  onLogoutSuccesful,
  onLoginClicked,
  onSignUpClicked,
}: NavbarProps) {
  return (
    <Navbar className="bg-[#423B34]" variant="dark" expand="sm" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to={"/"}>
          Note App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav>
            <Nav.Link as={Link} to={"/privacy"}>
              privacy
            </Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            {loggedInUser ? (
              <NavBarLoginView
                user={loggedInUser}
                onLogoutSuccesful={onLogoutSuccesful}
              />
            ) : (
              <NavBarLogoutView
                onLoginClicked={onLoginClicked}
                onSignUpClicked={onSignUpClicked}
              />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
