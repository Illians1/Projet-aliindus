import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import ContextUsers from "../../Context/ContextUsers";

function FilterUsers() {
  const { setAffichageUsers, listUsers } = useContext(ContextUsers);

  const filter = (e) => {
    e.preventDefault();
    let filteredUsers = [];
    setAffichageUsers(listUsers);
    if (e.target.value !== "") {
      const filter = (obj, value) => {
        if (
          (obj.nom &&
            obj.nom.toString().toUpperCase().indexOf(value.toUpperCase()) !==
              -1) ||
          (obj.nom_departement &&
            obj.nom_departement
              .toString()
              .toUpperCase()
              .indexOf(value.toUpperCase()) !== -1) ||
          (obj.code_postal &&
            obj.code_postal
              .toString()
              .toUpperCase()
              .indexOf(value.toUpperCase()) !== -1) ||
          (obj.ville &&
            obj.ville.toString().toUpperCase().indexOf(value.toUpperCase()) !==
              -1)
        ) {
          return true;
        } else {
          return false;
        }
      };
      filteredUsers = listUsers.filter((User) => filter(User, e.target.value));
    } else {
      filteredUsers = listUsers;
    }
    setAffichageUsers(filteredUsers);
  };

  return (
    <div className="header-historique">
      <span>Filtrer :</span>
      <div className="div-filtre">
        <Form.Control
          onChange={filter}
          className="border border-primary"
          type="text"
          placeholder="Filtre"
        />
      </div>
    </div>
  );
}

export default FilterUsers;
