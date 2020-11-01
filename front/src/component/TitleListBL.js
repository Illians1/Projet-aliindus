import React, { useContext } from "react";
import "../css/App.css";
import ContextBL from "./ContextBL";
import { RiArrowRightSFill, RiArrowDownSFill } from "react-icons/ri";

function TitleListBL(props) {
  const { affichageBL, setAffichageBL } = useContext(ContextBL);

  let type = props.type;
  let item = props.item;

  const toggle = (e, type) => {
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
    <li>
      <span className="title-list" onClick={(e) => toggle(e, type)}>
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
    </li>
  );
}

export default TitleListBL;
