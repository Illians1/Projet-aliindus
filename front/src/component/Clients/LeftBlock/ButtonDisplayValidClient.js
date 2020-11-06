import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import ContextClients from "../../Context/ContextClients";

function ButtonDisplayValidClient() {
  const { setAffichageValid } = useContext(ContextClients);

  const displayChecked = (e) => {
    if (e.target.checked === true) {
      setAffichageValid(true);
      console.log("no");
    } else {
      setAffichageValid(false);
      console.log("yes");
    }
  };

  return (
    <div>
      <span>Afficher les clients sans BL non-validés ? </span>
      <div className="historique-checkbox">
        <Form.Check
          defaultChecked={true}
          type={"switch"}
          id={"custom-switch"}
          label={""}
          onChange={(e) => displayChecked(e)}
        />
      </div>
    </div>
  );
}

export default ButtonDisplayValidClient;
