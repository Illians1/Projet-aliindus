import React from "react";
import "../css/App.css";
import HistoriqueBL from "./HistoriqueBL";
import NouveauBL from "./NouveauBL";

function BonLivraison(props) {
  return (
    <>
      <HistoriqueBL filtre={props.match.params.filter} />
      <NouveauBL />
    </>
  );
}

export default BonLivraison;
