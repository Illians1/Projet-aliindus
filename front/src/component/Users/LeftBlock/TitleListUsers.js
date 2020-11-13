import React, { useContext } from "react";
import { RiArrowRightSFill, RiArrowDownSFill } from "react-icons/ri";
import ContextUsers from "../../Context/ContextUsers";

function TitleListUsers(props) {
  const { setAffichageUsers, listUsers } = useContext(ContextUsers);

  let item = props.item;

  const toggle = (e) => {
    const newListUsers = [];
    listUsers.forEach((element) => {
      const nom = element.prenom + " " + element.nom;
      if (nom === e.target.innerHTML) {
        element.visible !== false
          ? (element.visible = false)
          : (element.visible = true);
      }
      newListUsers.push(element);
    });
    setAffichageUsers(newListUsers);
  };

  return (
    <div>
      <span className="title-list" onClick={toggle}>
        {item.prenom + " " + item.nom}
      </span>
      {item.visible === false ? (
        <RiArrowDownSFill className="arrow-list"></RiArrowDownSFill>
      ) : (
        <RiArrowRightSFill className="arrow-list"></RiArrowRightSFill>
      )}
    </div>
  );
}

export default TitleListUsers;
