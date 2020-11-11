import React, { useContext } from "react";
import ContextClients from "../../Context/ContextClients";

function ListeBLNonValides(props) {
  let item = props.item;
  const { listBL } = useContext(ContextClients);

  const checkNumberBL = () => {
    let numberBL = 0;
    listBL.forEach((element) => {
      if (element.codeClient === item.code && element.valide === "non") {
        numberBL++;
      }
    });
    return numberBL;
  };

  return (
    <div>
      <span className="date-BL">BL non valides : {checkNumberBL(item)}</span>
    </div>
  );
}

export default ListeBLNonValides;
