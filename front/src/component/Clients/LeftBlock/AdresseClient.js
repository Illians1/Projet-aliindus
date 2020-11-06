import React from "react";

function AdresseClient(props) {
  let item = props.item;

  return (
    <div>
      Adresse :{" "}
      {item.adresse === null ? <span>? </span> : <span>{item.adresse} </span>}
    </div>
  );
}

export default AdresseClient;
