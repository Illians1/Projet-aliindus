import React from "react";

function DateCreationBL(props) {
  let item = props.item;
  return (
    <div>
      Date création :{" "}
      {item.date === null ? (
        <span className="date-BL">? </span>
      ) : (
        <span className="date-BL">{item.date} </span>
      )}
    </div>
  );
}

export default DateCreationBL;
