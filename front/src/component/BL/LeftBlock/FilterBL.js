import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import ContextBL from "../../Context/ContextBL";

function FilterBL() {
  const { listBL, setAffichageBL } = useContext(ContextBL);

  const filter = (e) => {
    e.preventDefault();
    let filteredBL = [];
    setAffichageBL(listBL);
    if (e.target.value !== "") {
      const filter = (obj, value) => {
        if (
          (obj.nomClient &&
            obj.nomClient
              .toString()
              .toUpperCase()
              .indexOf(value.toUpperCase()) !== -1) ||
          (obj.date &&
            obj.date.toString().toUpperCase().indexOf(value.toUpperCase()) !==
              -1) ||
          (obj.numeroBl &&
            obj.numeroBl
              .toString()
              .toUpperCase()
              .indexOf(value.toUpperCase()) !== -1) ||
          (obj.numeroCarnet &&
            obj.numeroCarnet
              .toString()
              .toUpperCase()
              .indexOf(value.toUpperCase()) !== -1)
        ) {
          return true;
        } else {
          return false;
        }
      };
      filteredBL = listBL.filter((BL) => filter(BL, e.target.value));
    } else {
      filteredBL = listBL;
    }
    setAffichageBL(filteredBL);
  };

  return (
    <div>
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

export default FilterBL;
