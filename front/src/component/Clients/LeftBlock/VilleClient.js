import React from "react";

function NumeroBLBL(props) {
  let item = props.item;

  return (
    <div>
      Ville :{" "}
      {item.ville === null ? (
        <span className="num-carnet">? </span>
      ) : (
        <span className="num-carnet">{item.ville} </span>
      )}
    </div>
  );
}

export default NumeroBLBL;
