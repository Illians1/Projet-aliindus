import React, { useContext } from "react";
import ContextBL from "../../Context/ContextBL";
import { RiArrowRightSFill, RiArrowDownSFill } from "react-icons/ri";

function TitleListBL(props) {
  const { affichageBL, setAffichageBL, triBL } = useContext(ContextBL);

  let type = triBL;
  let item = props.item;

  const toggle = (e) => {
    const newBL = [];
    affichageBL.forEach((element) => {
      if (
        (type === "client" && element.nomClient === e.target.innerHTML) ||
        (type === "date" && element.date === e.target.innerHTML)
      ) {
        element.visible !== false
          ? (element.visible = false)
          : (element.visible = true);
      } else if (
        type === "client" &&
        e.target.innerHTML === "Client inconnu" &&
        element.nomClient === null
      ) {
        element.visible !== false
          ? (element.visible = false)
          : (element.visible = true);
      }
      newBL.push(element);
    });
    setAffichageBL(newBL);
  };

  return (
    <div>
      <span className="title-list" onClick={toggle}>
        {type === "client"
          ? item.nomClient !== null
            ? item.nomClient
            : "Client inconnu"
          : item.date}
      </span>
      {item.visible === false ? (
        <RiArrowDownSFill className="arrow-list"></RiArrowDownSFill>
      ) : (
        <RiArrowRightSFill className="arrow-list"></RiArrowRightSFill>
      )}
    </div>
  );
}

export default TitleListBL;
