import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import ContextClientsUsers from "../../Context/ContextClientsUsers";
import ContextClients from "../../Context/ContextClients";

function FilterClients(props) {
  const { listClients } = useContext(ContextClientsUsers);
  const { setAffichageClients } = useContext(ContextClients);

  const filter = (e) => {
    e.preventDefault();
    let filteredClients = [];
    setAffichageClients(listClients);
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
      filteredClients = listClients.filter((Client) =>
        filter(Client, e.target.value)
      );
    } else {
      filteredClients = listClients;
    }
    setAffichageClients(filteredClients);
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

export default FilterClients;
