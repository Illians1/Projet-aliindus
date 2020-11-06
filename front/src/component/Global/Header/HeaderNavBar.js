import React from "react";
import {
  BsBookHalf,
  BsBriefcaseFill,
  BsFillPersonLinesFill,
} from "react-icons/bs";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

function HeaderNavBar() {
  return (
    <Nav className="group-nav d-flex justify-content-around">
      <Link to="/bl" className="d-flex justify-content-center flex-wrap">
        <BsBookHalf className="nav-icon" />
        <span className="nav-text">Gestion BL</span>
      </Link>
      <Link to="/clients" className="d-flex justify-content-center flex-wrap">
        <BsBriefcaseFill className="nav-icon" />
        <span className="nav-text">Clients</span>
      </Link>
      <Link to="/users" className="d-flex justify-content-center flex-wrap">
        <BsFillPersonLinesFill className="nav-icon" />
        <span className="nav-text">Utilisateurs</span>
      </Link>
    </Nav>
  );
}

export default HeaderNavBar;
