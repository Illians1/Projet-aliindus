import React from "react";
import Navbar from "react-bootstrap/Navbar";
import HeaderNavBar from "./HeaderNavBar";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <Navbar bg="light" className="justify-content-between" expand="lg">
        <Navbar.Brand className="navbar-brand">
          <Link to="/bl">
            <img
              className="logo"
              alt="logo"
              src={require("../../../images/aliindustrie.jpg")}
            ></img>
          </Link>
        </Navbar.Brand>
        <span className="title"> Gestion des bons de livraison</span>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <HeaderNavBar />
      </Navbar>
    </header>
  );
}

export default Header;
