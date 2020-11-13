import React, { useContext } from "react";
import ContextBL from "../../Context/ContextBL";
import { BsArrowLeftShort } from "react-icons/bs";
import FormBL from "./FormBL";

function RightBlockBL() {
  const {
    affichageBloc,
    setAffichageBloc,
    setFormData,
    todayDate,
    setErrorClient,
  } = useContext(ContextBL);

  const backToNewBL = () => {
    setAffichageBloc("");
    setFormData({
      client: "",
      date: todayDate(),
      user: "admin admin",
      numCarnet: "",
      numBL: "",
      infos: " ",
    });
    setErrorClient("");
  };

  return (
    <div className="nouveau-bl">
      {affichageBloc === "" ? (
        ""
      ) : (
        <h5 className="link-back-to-new" onClick={backToNewBL}>
          <BsArrowLeftShort className="arrow-back-to-new-bl"></BsArrowLeftShort>
          Retour création de BL
        </h5>
      )}
      <div className="nouveau-bl-child">
        <h1>
          {affichageBloc === ""
            ? "Enregistrement d'un nouveau Bon de Livraison"
            : "Modifier le bon de livraison"}
        </h1>
        <div className="form-new-bl">
          <FormBL />
        </div>
      </div>
    </div>
  );
}

export default RightBlockBL;
