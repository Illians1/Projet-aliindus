import React, { useState } from "react";
import "../css/App.css";
import LeftElementHeader from "./LeftElementHeader";
import TriParDate from "./TriParDate";
import TriParClient from "./TriParClient";

function HistoriqueBL(props) {
  const [listBL, setListBL] = useState([]);
  const [button, setButton] = useState("Date de création");

  const triBL = (listBL) => {
    setListBL(listBL);
  };

  const changeButton = (button) => {
    setButton(button);
  };

  const renderSwitch = (filtre) => {
    switch (filtre) {
      case "client": {
        return (
          <TriParClient
            changeButton={changeButton}
            triBL={triBL}
            listBL={listBL}
          />
        );
      }
      default: {
        return (
          <TriParDate
            changeButton={changeButton}
            triBL={triBL}
            listBL={listBL}
          />
        );
      }
    }
  };

  return (
    <div className="historique-bl">
      <div className="texte-historique">
        <LeftElementHeader button={button} />
        <ul>{renderSwitch(props.filtre)}</ul>
      </div>
    </div>
  );
}

export default HistoriqueBL;
