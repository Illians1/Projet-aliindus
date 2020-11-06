import React from "react";
import Navbar from "react-bootstrap/Navbar";

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
