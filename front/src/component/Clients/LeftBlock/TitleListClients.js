import React, { useContext } from "react";
import { RiArrowRightSFill, RiArrowDownSFill } from "react-icons/ri";
import ContextClientsUsers from "../../Context/ContextClientsUsers";
import ContextClients from "../../Context/ContextClients";

function TitleListClients(props) {
  const { setAffichageClients } = useContext(ContextClients);
  const { listClients } = useContext(ContextClientsUsers);

  let item = props.item;

  const toggle = (e) => {
    const newListClients = [];
    listClients.forEach((element) => {
      if (element.nom === e.target.innerHTML) {
        element.visible !== false
          ? (element.visible = false)
          : (element.visible = true);
      }
      newListClients.push(element);
    });
    setAffichageClients(newListClients);
  };

  return (
    <div>
      <span className="title-list" onClick={toggle}>
        {item.nom}
      </span>
      {item.visible === false ? (
        <RiArrowDownSFill className="arrow-list"></RiArrowDownSFill>
      ) : (
        <RiArrowRightSFill className="arrow-list"></RiArrowRightSFill>
      )}
    </div>
  );
}

export default TitleListClients;
