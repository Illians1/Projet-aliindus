import React from "react";

function NumeroBLBL(props) {
  let item = props.item;

  return (
    <div>
      Code Postal :{" "}
      {item.code_postal === null ? (
        <span>? </span>
      ) : (
        <span>{item.code_postal} </span>
      )}
    </div>
  );
}

export default NumeroBLBL;
