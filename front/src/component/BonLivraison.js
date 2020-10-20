import React, { useState } from "react";
import "../css/App.css";
import HistoriqueBL from "./HistoriqueBL";
import NouveauBL from "./NouveauBL";
import ContextBL from "./ContextBL";

function BonLivraison(props) {
  const [listBL, setListBL] = useState([]);
  const [affichageBL, setAffichageBL] = useState([]);

  const contextValue = {
    listBL: listBL,
    affichageBL: affichageBL,
    setListBL: setListBL,
    setAffichageBL: setAffichageBL,
  };

  return (
    <ContextBL.Provider value={contextValue}>
      <HistoriqueBL filtre={props.match.params.filter} />
      <NouveauBL />
    </ContextBL.Provider>
  );
}

export default BonLivraison;
