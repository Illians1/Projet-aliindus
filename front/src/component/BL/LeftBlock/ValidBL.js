import React, { useContext } from "react";
import { RiCheckboxBlankLine, RiCheckboxLine } from "react-icons/ri";
import ContextBL from "../../Context/ContextBL";
import axios from "axios";

function ValidBL(props) {
  const { listBL, setListBL, setAffichageBL } = useContext(ContextBL);

  let item = props.item;

  const changeValide = (e) => {
    const newBL = [];
    listBL.forEach((element) => {
      if (
        e.target.dataset.id &&
        e.target.dataset.id.toString() === element.id.toString()
      ) {
        if (element.valide === "oui") {
          element.valide = "non";
          axios
            .post(
              `http://localhost:3001/api/bl/${element.valide}/${element.id}`
            )
            .then((res) => {
              console.log(res);
              console.log(res.data);
            });
        } else {
          element.valide = "oui";
          axios
            .post(
              `http://localhost:3001/api/bl/${element.valide}/${element.id}`
            )
            .then((res) => {
              console.log(res);
              console.log(res.data);
            });
        }
      }
      newBL.push(element);
    });
    setAffichageBL(newBL);
    setListBL(newBL);
  };

  return (
    <>
      <span>Validé ? </span>
      {item.valide === "oui" ? (
        <RiCheckboxLine
          data-id={item.id}
          onClick={changeValide}
          className="valide-check"
        ></RiCheckboxLine>
      ) : (
        <RiCheckboxBlankLine
          data-id={item.id}
          onClick={changeValide}
          className="valide-check"
        ></RiCheckboxBlankLine>
      )}
    </>
  );
}

export default ValidBL;
