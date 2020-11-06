import React from "react";

function NumeroBLBL(props) {
  let item = props.item;

  return (
    <div>
      Numéro BL :{" "}
      {item.numeroBl === null ? (
        <span className="num-bl">? </span>
      ) : (
        <span className="num-bl">{item.numeroBl} </span>
      )}
    </div>
  );
}

export default NumeroBLBL;
