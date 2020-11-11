import React from "react";
import Navbar from "react-bootstrap/Navbar";
import HeaderNavBar from "./HeaderNavBar";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function Header(props) {
  const isAuthenticated = props.isAuthenticated;
  const isAdmin = props.isAdmin;
  const disconnect = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

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
        {isAuthenticated() === true ? (
          <>
            <Button onClick={disconnect} variant="secondary">
              Se déconnecter
            </Button>
          </>
        ) : (
          ""
        )}
        <HeaderNavBar isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
      </Navbar>
    </header>
  );
}

export default Header;
