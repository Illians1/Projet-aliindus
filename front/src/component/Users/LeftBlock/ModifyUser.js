import React, { useContext } from "react";
import ContextUsers from "../../Context/ContextUsers";

function ModifyUser(props) {
  const { setAffichageBloc, setFormData, setErrorAccount, setErrorPassword } = useContext(
    ContextUsers
  );

  const modifyBlock = () => {
    let item = props.item;
    setAffichageBloc(props.item);

    setFormData({
      nom: item.nom,
      prenom: item.prenom,
      pseudo: item.pseudo,
      role: item.role,
      password: "",
      repeatPassword: "",
    });
    setErrorAccount("");
    setErrorPassword("");
    window.scrollTo(0, 0);
  };

  return (
    <span onClick={modifyBlock} className="link-modif">
      Modifier
    </span>
  );
}

export default ModifyUser;
