import React from "react";
import DropDownDate from "./DropDownDate";
import FilterBL from "./FilterBL";
import ButtonDisplayValidBL from "./ButtonDisplayValidBL";
import ButtonSortBL from "./ButtonSortBL";

function LeftElementHeader(props) {
  return (
    <div className="header-historique">
      <ButtonSortBL button={props.button} />
      <FilterBL />
      <DropDownDate />
      <ButtonDisplayValidBL />
    </div>
  );
}

export default LeftElementHeader;
