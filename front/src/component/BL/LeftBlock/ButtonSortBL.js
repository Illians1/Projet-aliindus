import React, { useContext, useState } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import ContextBL from "../../Context/ContextBL";

function ButtonSortBL() {
  const { setTriBL } = useContext(ContextBL);
  const [button, setButton] = useState("Date de création");

  const changeTriBL = (filtre) => {
    console.log("changeTri");
    switch (filtre) {
      case "client": {
        setTriBL("client");
        setButton("Client");
        break;
      }
      default: {
        setTriBL("date");
        setButton("Date de création");
        break;
      }
    }
  };

  return (
    <div className="dropdown">
      <span>Trier par : </span>
      <DropdownButton id="dropdown-basic-button" title={button}>
        <button className="dropdown-item" onClick={() => changeTriBL("date")}>
          Date de création
        </button>
        <button className="dropdown-item" onClick={() => changeTriBL("client")}>
          Client
        </button>
      </DropdownButton>
    </div>
  );
}

export default ButtonSortBL;
