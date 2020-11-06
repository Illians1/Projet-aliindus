import React from "react";

function ClientBL(props) {
  let item = props.item;

  return (
    <div>
      Client :{" "}
      {item.nomClient === null ? (
        <span className="nom-client">? </span>
      ) : (
        <span className="nom-client">{item.nomClient} </span>
      )}
    </div>
  );
}

export default ClientBL;
