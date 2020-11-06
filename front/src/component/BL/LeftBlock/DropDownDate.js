import React, { useState, useContext } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import ContextBL from "../../Context/ContextBL";

function DropDownDate() {
  const [dateButton, setDateButton] = useState("Toutes les dates");

  const { listBL, setAffichageBL } = useContext(ContextBL);

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
        setDateButton("Moins d'un mois");
        break;
      }
      case "an": {
        filteredBL = listBL.filter((BL) => filtre(365, BL.date));
        setDateButton("Moins d'un an");
        break;
      }
      default: {
        filteredBL = listBL;
        setDateButton("Toutes les dates");
      }
    }
    setAffichageBL(filteredBL);
  };

  return (
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
        <Dropdown.Item onClick={() => triDate("an")} className="dropdown-item">
          Moins d'un an
        </Dropdown.Item>
      </DropdownButton>
    </div>
  );
}

export default DropDownDate;
