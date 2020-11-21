import React, { useContext } from "react";
import FormUsers from "./FormUsers";
import ContextUsers from "../../Context/ContextUsers";
import { BsArrowLeftShort } from "react-icons/bs";

function RightBlockUsers() {
  const { affichageBloc, setAffichageBloc, setFormData } = useContext(
    ContextUsers
  );

  const backToNewUser = () => {
    setAffichageBloc("");
    setFormData({
      nom: "",
      prenom: "",
      pseudo: "",
      password: "",
      repeatPassword: "",
    });
  };

  return (
    <div className="col-12 col-xl-8 order-1 order-xl-2">
      <div className="nouveau-bl">
        {affichageBloc === "" ? (
          ""
        ) : (
          <div className="parent-back-to-new">
            <h5 className="link-back-to-new" onClick={backToNewUser}>
              <BsArrowLeftShort className="arrow-back-to-new-bl"></BsArrowLeftShort>
              Retour création d'utilisateur
            </h5>
          </div>
        )}
        <div className="nouveau-bl-child row d-flex justify-content-center align-items-center">
          <h1>
            {affichageBloc === ""
              ? "Enregistrement d'un nouvel utilisateur"
              : "Modifier l'utilisateur"}
          </h1>
          <div className="form-new-bl">
            <FormUsers />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightBlockUsers;
