import React from "react";
import "../css/App.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

function LeftElementHeader(props) {
  return (
    <div className="header-historique">
      <div className="dropdown">
        <span>Trier par : </span>
        <DropdownButton id="dropdown-basic-button" title={props.button}>
          <Link to="/bl" className="dropdown-item">
            Date de création
          </Link>
          <Link to="/bl/client" className="dropdown-item">
            Client
          </Link>
          <Link to="/bl/date-validation" className="dropdown-item">
            Date de validation
          </Link>
          <Link to="/bl/employe" className="dropdown-item">
            Employé
          </Link>
        </DropdownButton>
      </div>
      <div>
        <span>Afficher BL validés ? </span>
        <div className="historique-checkbox">
          <Form.Check type={"switch"} id={"custom-switch"} label={""} />
        </div>
      </div>
    </div>
  );
}

export default LeftElementHeader;
