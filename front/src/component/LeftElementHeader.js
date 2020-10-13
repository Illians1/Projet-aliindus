import React from "react";
import "../css/App.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

function LeftElementHeader(props) {
  const changeData = (e) => {
    const newBL = [];
    props.listBL.forEach((element) => {
      newBL.push(element);
    });
    console.log(newBL);
    newBL.sort(function compare(a, b) {
      if (
        (a.nomClient == null && b.nomClient != null) ||
        (a.nomClient != null &&
          b.nomClient != null &&
          a.nomClient.localeCompare(b.nomClient) === -1)
      ) {
        return -1;
      } else if (a.nomClient === b.nomClient) {
        if (
          (a.numeroCarnet == null && b.numeroCarnet != null) ||
          (a.numeroCarnet != null &&
            b.numeroCarnet != null &&
            a.numeroCarnet < b.numeroCarnet)
        ) {
          return -1;
        } else if (a.numeroCarnet === b.numeroCarnet) {
          if (
            (a.numeroBL == null && b.numeroBL != null) ||
            (a.numeroBL != null &&
              b.numeroBL != null &&
              a.numeroBL < b.numeroBL)
          ) {
            return -1;
          } else {
            return 1;
          }
        } else {
          return 1;
        }
      } else {
        return 1;
      }
    });
    console.log(newBL);
  };

  return (
    <div className="dropdown">
      <span>Trier par : </span>
      <DropdownButton id="dropdown-basic-button" title="Date de création">
        <Dropdown.Item data-link="BL" onClick={(e) => changeData(e)}>
          Date de création
        </Dropdown.Item>
        <Dropdown.Item>Client</Dropdown.Item>
        <Dropdown.Item data-link="CR" onClick={(e) => changeData(e)}>
          Date de validation
        </Dropdown.Item>
        <Dropdown.Item>Employé</Dropdown.Item>
      </DropdownButton>
    </div>
  );
}

export default LeftElementHeader;
