import React, { useState, useEffect } from "react";
import "../css/App.css";
import HistoriqueBL from "./HistoriqueBL";
import NouveauBL from "./NouveauBL";

function BonLivraison() {
  return (
    <>
      <HistoriqueBL />
      <NouveauBL />
    </>
  );
}

export default BonLivraison;
