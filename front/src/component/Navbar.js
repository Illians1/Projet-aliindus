import React from "react";
import "../css/App.css";
import Navbar from "react-bootstrap/Navbar";
import {
  BsBookHalf,
  BsBriefcaseFill,
  BsFillPersonLinesFill,
} from "react-icons/bs";
import Nav from "react-bootstrap/Nav";

function NavBar() {
  return (
    <>
      <header>
        <Navbar bg="light" className="justify-content-between" expand="lg">
          <Navbar.Brand className="navbar-brand" href="google.com">
            <img
              className="logo"
              alt="logo"
              src={require("../images/aliindustrie.jpg")}
            ></img>
          </Navbar.Brand>
          <span className="title"> Gestion des bons de livraison</span>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav className="group-nav d-flex justify-content-around">
            <a
              href="google.com"
              className="d-flex justify-content-center flex-wrap"
            >
              <BsBookHalf className="nav-icon" />
              <span className="nav-text">Gestion BL</span>
            </a>
            <a
              href="google.com"
              className="d-flex justify-content-center flex-wrap"
            >
              <BsBriefcaseFill className="nav-icon" />
              <span className="nav-text">Clients</span>
            </a>
            <a
              href="google.com"
              className="d-flex justify-content-center flex-wrap"
            >
              <BsFillPersonLinesFill className="nav-icon" />
              <span className="nav-text">Utilisateurs</span>
            </a>
          </Nav>
        </Navbar>
      </header>
    </>
  );
}

export default NavBar;
