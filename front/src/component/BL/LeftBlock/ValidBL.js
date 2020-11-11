import React, { useContext } from "react";
import { RiCheckboxBlankLine, RiCheckboxLine } from "react-icons/ri";
import ContextBL from "../../Context/ContextBL";
import axios from "axios";

function ValidBL(props) {
  const { listBL, setListBL, setAffichageBL } = useContext(ContextBL);

  let item = props.item;

  const changeValide = (e) => {
    const newBL = [];
    listBL.forEach((element) => {
      if (
        e.target.dataset.id &&
        e.target.dataset.id.toString() === element.id.toString()
      ) {
        if (element.valide === "oui") {
          element.valide = "non";
          axios
            .put(
              `http://localhost:3001/api/bl/`,
              {
                valide: element.valide,
                id: element.id,
              },
              {
                headers: {
                  Authorization: localStorage.getItem("user"),
                },
              }
            )
            .then((res) => {
              console.log(res);
              console.log(res.data);
            })
            .catch((error) => {
              if (error.response && error.response.data.authError) {
                if (localStorage.getItem("user")) {
                  localStorage.removeItem("user");
                }
                window.location.reload();
              }
            });
        } else {
          element.valide = "oui";
          axios
            .put(
              `http://localhost:3001/api/bl/valid`,
              {
                valide: element.valide,
                id: element.id,
              },
              {
                headers: {
                  Authorization: localStorage.getItem("user"),
                },
              }
            )
            .then((res) => {
              console.log(res);
              console.log(res.data);
            })
            .catch((error) => {
              if (error.response && error.response.data.authError) {
                if (localStorage.getItem("user")) {
                  localStorage.removeItem("user");
                }
                window.location.reload();
              }
            });
        }
      }
      newBL.push(element);
    });
    setAffichageBL(newBL);
    setListBL(newBL);
  };

  return (
    <>
      <span>Validé ? </span>
      {item.valide === "oui" ? (
        <RiCheckboxLine
          data-id={item.id}
          onClick={changeValide}
          className="valide-check"
        ></RiCheckboxLine>
      ) : (
        <RiCheckboxBlankLine
          data-id={item.id}
          onClick={changeValide}
          className="valide-check"
        ></RiCheckboxBlankLine>
      )}
    </>
  );
}

export default ValidBL;
