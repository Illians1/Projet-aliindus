import React from "react";

function UserBL(props) {
  let item = props.item;

  return (
    <div>
      Créateur BL :{" "}
      {item.nomUtilisateur === null ? (
        <span className="date-BL">? </span>
      ) : (
        <span className="date-BL">{item.nomUtilisateur} </span>
      )}
    </div>
  );
}

export default UserBL;
