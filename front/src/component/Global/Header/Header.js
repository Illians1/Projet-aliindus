import React, { useEffect } from "react";
import HeaderNavBar from "./HeaderNavBar";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function Header(props) {
  const pseudo = props.pseudo;
  const setPseudo = props.setPseudo;
  const isAuthenticated = props.isAuthenticated;
  const isAdmin = props.isAdmin;

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      const user = JSON.parse(localStorage.getItem("user"));
      setPseudo(user.pseudo);
    }
  }, []);

  const disconnect = () => {
    localStorage.removeItem("user");
    setPseudo("");
    window.location.reload();
  };

  return (
    <header className="container-fluid p-0">
      <div className="header-row row m-0">
        <div className="col-12 col-xl-2 d-flex justify-content-center align-items-center margin-header">
          <Link to="/bl">
            <img className="logo" alt="logo" src="/images/aliindustrie.jpg" />
          </Link>
        </div>
        <span className="title d-none d-xl-inline-block col-xl-4 margin-header text-center">
          Gestion des bons de livraison
        </span>
        {isAuthenticated() === true ? (
          <div className="row col-12 col-xl-3 d-flex justify-content-center margin-header button-header align-items-center">
            {pseudo !== "" ? <span className="col-12 text-center">Connecté en tant que     <strong>{" " + pseudo}</strong></span> : ""}
            <div className="col-12 d-flex justify-content-center"><Button onClick={disconnect} variant="secondary">
              Se déconnecter
            </Button></div>
          </div>
        ) : (
            ""
          )}
        <HeaderNavBar isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
      </div>
    </header>
  );
}

export default Header;
