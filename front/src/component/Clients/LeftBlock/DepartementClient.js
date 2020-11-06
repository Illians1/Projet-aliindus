import React from "react";

function DepartementClient(props) {
  let item = props.item;

  return (
    <div>
      Département :{" "}
      {item.nom_departement === null ? (
        <span className="num-bl">? </span>
      ) : (
        <span className="num-bl">{item.nom_departement} </span>
      )}
    </div>
  );
}

export default DepartementClient;
