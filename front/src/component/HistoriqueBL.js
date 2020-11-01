import React, { useState } from "react";
import "../css/App.css";
import LeftElementHeader from "./LeftElementHeader";
import TriParDate from "./TriParDate";
import TriParClient from "./TriParClient";

function HistoriqueBL(props) {
  const [button, setButton] = useState("Date de création");

  const renderSwitch = (filtre) => {
    switch (filtre) {
      case "client": {
        return <TriParClient changeButton={setButton} />;
      }
      default: {
        return <TriParDate changeButton={setButton} />;
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
