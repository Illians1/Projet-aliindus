import React, { useState, useContext } from "react";
import "../css/App.css";
import LeftElementHeader from "./LeftElementHeader";
import TriParDate from "./TriParDate";
import TriParClient from "./TriParClient";
import ContextBL from "./ContextBL";
import axios from "axios";

function HistoriqueBL(props) {
  const [button, setButton] = useState("Date de création");

  const { listBL, setListBL, setAffichageBL } = useContext(ContextBL);

  const changeValide = (e) => {
    const newBL = [];
    listBL.forEach((element) => {
      if (
        e.target.dataset.id &&
        e.target.dataset.id.toString() === element.id.toString()
      ) {
        if (element.valide === "oui") {
          element.valide = "non";
          axios
            .post(
              `http://localhost:3000/api/bl/${element.valide}/${element.id}`
            )
            .then((res) => {
              console.log(res);
              console.log(res.data);
            });
        } else {
          element.valide = "oui";
          axios
            .post(
              `http://localhost:3000/api/bl/${element.valide}/${element.id}`
            )
            .then((res) => {
              console.log(res);
              console.log(res.data);
            });
        }
      }
      newBL.push(element);
    });
    setAffichageBL(newBL);
    setListBL(newBL);
  };

  const renderSwitch = (filtre) => {
    switch (filtre) {
      case "client": {
        return (
          <TriParClient changeButton={setButton} changeValide={changeValide} />
        );
      }
      default: {
        return (
          <TriParDate changeButton={setButton} changeValide={changeValide} />
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
