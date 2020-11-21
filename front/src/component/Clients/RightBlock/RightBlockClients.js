import React, { useContext } from "react";
import FormClient from "./FormClient";
import ContextClients from "../../Context/ContextClients";
import { BsArrowLeftShort } from "react-icons/bs";

function RightBlockBL() {
  const {
    affichageBloc,
    setAffichageBloc,
    setFormData,
    setErrorCode,
  } = useContext(ContextClients);

  const backToNewClient = () => {
    setAffichageBloc("");
    setFormData({
      nom: "",
      code: "",
      adresse: "",
      ville: "",
      codePostal: "",
      departement: "",
    });
    setErrorCode("");
  };
  return (
    <div className="col-12 col-xl-8 order-1 order-xl-2">
      <div className="nouveau-bl">
        {affichageBloc === "" ? (
          ""
        ) : (
          <div className="parent-back-to-new">
            <h5 className="link-back-to-new" onClick={backToNewClient}>
              <BsArrowLeftShort className="arrow-back-to-new-bl"></BsArrowLeftShort>
              Retour création de Client
            </h5>
          </div>
        )}
        <div className="nouveau-bl-child row d-flex justify-content-center align-items-center">
          <h1>
            {affichageBloc === ""
              ? "Enregistrement d'un nouveau Client"
              : "Modifier le client"}
          </h1>
          <div className="form-new-bl">
            <FormClient />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightBlockBL;
