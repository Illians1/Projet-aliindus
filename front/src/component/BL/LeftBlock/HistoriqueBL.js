import React from "react";
import LeftElementHeader from "./LeftElementHeader";
import ListBL from "./ListBL";

function HistoriqueBL() {
  return (
    <div className="col-12 col-xl-4 order-2 order-xl-1">
      <div className="historique-bl d-flex justify-content-center">
        <div className="texte-historique">
          <LeftElementHeader />
          <ul>
            <ListBL />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HistoriqueBL;
