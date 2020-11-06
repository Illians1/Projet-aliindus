import React, { useContext } from "react";
import ContextClients from "../../Context/ContextClients";

function ModifyClient(props) {
  const { setAffichageBloc, setFormData } = useContext(ContextClients);

  const modifyBlock = () => {
    let item = props.item;
    setAffichageBloc(props.item);

    setFormData({
      nom: item.nom,
      code: item.code,
      adresse: item.adresse,
      ville: item.ville,
      codePostal: item.code_postal,
      departement: item.nom_departement,
    });
    window.scrollTo(0, 0);
  };

  return (
    <span onClick={modifyBlock} className="link-modif">
      Modifier
    </span>
  );
}

export default ModifyClient;
