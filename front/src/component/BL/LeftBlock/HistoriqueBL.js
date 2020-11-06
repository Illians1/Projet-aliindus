import React from "react";
import LeftElementHeader from "./LeftElementHeader";
import ListBL from "./ListBL";

function HistoriqueBL() {
  return (
    <div className="historique-bl">
      <div className="texte-historique">
        <LeftElementHeader />
        <ul>
          <ListBL />
        </ul>
      </div>
    </div>
  );
}

export default HistoriqueBL;
