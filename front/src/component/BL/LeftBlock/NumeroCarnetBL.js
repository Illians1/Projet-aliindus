import React from "react";

function NumeroCarnetBL(props) {
  let item = props.item;
  return (
    <div>
      Numéro Carnet :{" "}
      {item.numeroCarnet === null ? (
        <span className="num-carnet">? </span>
      ) : (
        <span className="num-carnet">{item.numeroCarnet} </span>
      )}
    </div>
  );
}

export default NumeroCarnetBL;
