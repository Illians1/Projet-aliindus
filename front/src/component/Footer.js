import React from "react";
import "../css/App.css";
import Navbar from "react-bootstrap/Navbar";
import {
  BsBookHalf,
  BsBriefcaseFill,
  BsFillPersonLinesFill,
} from "react-icons/bs";
import Nav from "react-bootstrap/Nav";

function Footer() {
  return (
    <>
      <footer>
        <Navbar
          bg="light"
          className=" footer-navbar justify-content-center"
          expand="lg"
        >
          <p>Créé par Aouida Mehdi.</p>
        </Navbar>
      </footer>
    </>
  );
}

export default Footer;
