import React, { useState, useContext } from "react";
import "../css/App.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import ContextBL from "./ContextBL";

function LeftElementHeader(props) {
  const [dateButton, setDateButton] = useState("Toutes les dates");

  const { listBL, setAffichageBL } = useContext(ContextBL);

  const displayChecked = (e) => {
    let filteredBL = [];
    if (e.target.checked === false) {
      filteredBL = listBL.filter((BL) => BL.valide !== "oui");
      console.log(filteredBL);
    } else {
      filteredBL = listBL;
    }
    setAffichageBL(filteredBL);
  };

  const triDate = (code) => {
    let filteredBL = [];
    const filtre = (option, date) => {
      let DD = date.split("/")[0];
      let MM = date.split("/")[1];
      let YYYY = date.split("/")[2];
      let newDate = new Date(YYYY + "-" + MM + "-" + DD);
      if ((Date.now() - newDate) / 86400000 < option) {
        return true;
      } else {
        return false;
      }
    };
    switch (code) {
      case "mois": {
        filteredBL = listBL.filter((BL) => filtre(30, BL.date));
        setDateButton("Ce mois-ci");
        break;
      }
      case "an": {
        filteredBL = listBL.filter((BL) => filtre(365, BL.date));
        setDateButton("Cette année");
        break;
      }
      default: {
        filteredBL = listBL;
        setDateButton("Toutes les dates");
      }
    }
    setAffichageBL(filteredBL);
  };

  const filter = (e) => {
    e.preventDefault();
    let filteredBL = [];
    setAffichageBL(listBL);
    if (e.target.value !== "") {
      const filter = (obj, value) => {
        if (
          (obj.nomClient &&
            obj.nomClient
              .toString()
              .toUpperCase()
              .indexOf(value.toUpperCase()) !== -1) ||
          (obj.date &&
            obj.date.toString().toUpperCase().indexOf(value.toUpperCase()) !==
              -1) ||
          (obj.numeroBl &&
            obj.numeroBl
              .toString()
              .toUpperCase()
              .indexOf(value.toUpperCase()) !== -1) ||
          (obj.numeroCarnet &&
            obj.numeroCarnet
              .toString()
              .toUpperCase()
              .indexOf(value.toUpperCase()) !== -1)
        ) {
          return true;
        } else {
          return false;
        }
      };
      filteredBL = listBL.filter((BL) => filter(BL, e.target.value));
    } else {
      filteredBL = listBL;
    }
    setAffichageBL(filteredBL);
  };

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
          <Link to="/bl/employe" className="dropdown-item">
            Employé
          </Link>
        </DropdownButton>
      </div>
      <div>
        <span>Filtrer :</span>
        <div className="div-filtre">
          <Form.Control
            onChange={(e) => filter(e)}
            className="border border-primary"
            type="text"
            placeholder="Filtrer"
          />
        </div>
      </div>
      <div className="dropdown">
        <span>Date : </span>
        <DropdownButton id="dropdown-basic-button" title={dateButton}>
          <Dropdown.Item onClick={() => triDate("")} className="dropdown-item">
            Toutes les dates
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => triDate("mois")}
            className="dropdown-item"
          >
            Moins d'un mois
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => triDate("an")}
            className="dropdown-item"
          >
            Moins d'un an
          </Dropdown.Item>
        </DropdownButton>
      </div>
      <div>
        <span>Afficher BL validés ? </span>
        <div className="historique-checkbox">
          <Form.Check
            defaultChecked={true}
            type={"switch"}
            id={"custom-switch"}
            label={""}
            onChange={(e) => displayChecked(e)}
          />
        </div>
      </div>
    </div>
  );
}

export default LeftElementHeader;
