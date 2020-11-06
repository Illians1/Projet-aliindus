import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import ContextBL from "../../Context/ContextBL";

function ButtonDisplayValidBL() {
  const { setAffichageValid } = useContext(ContextBL);

  const displayChecked = (e) => {
    if (e.target.checked === true) {
      setAffichageValid(true);
      console.log("check");
    } else {
      setAffichageValid(false);
      console.log("nocheck");
    }
  };

  return (
    <div>
      <span>Afficher BL validés ? </span>
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

export default ButtonDisplayValidBL;
