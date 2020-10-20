import React, { useEffect, useContext } from "react";
import "../css/App.css";
import {
  RiArrowRightSFill,
  RiArrowDownSFill,
  RiCheckboxBlankLine,
  RiCheckboxLine,
} from "react-icons/ri";
import axios from "axios";
import ContextBL from "./ContextBL";

function TriParClient(props) {
  const { affichageBL, setListBL, setAffichageBL } = useContext(ContextBL);

  useEffect(() => {
    props.changeButton("Client");
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:3000/api/BL/client`);
      setListBL(result.data.results);
      setAffichageBL(result.data.results);
    };
    fetchData();
  }, []);

  const toggleNomClient = (e) => {
    const newBL = [];
    affichageBL.forEach((element) => {
      if (element.nomClient === e.target.innerHTML) {
        element.visible !== false
          ? (element.visible = false)
          : (element.visible = true);
      } else if (
        e.target.innerHTML === "Client inconnu" &&
        element.nomClient === null
      ) {
        element.visible !== false
          ? (element.visible = false)
          : (element.visible = true);
      }
      newBL.push(element);
    });
    setAffichageBL(newBL);
  };

  const changeValide = (e) => {
    props.changeValide(e);
  };

  return (
    <>
      {affichageBL.map((item, index) => (
        <div key={index}>
          {index > 0 ? (
            affichageBL[index].nomClient ===
            affichageBL[index - 1].nomClient ? (
              ""
            ) : (
              <li>
                <span
                  className="title-list"
                  onClick={(e) => toggleNomClient(e)}
                >
                  {item.nomClient !== null ? item.nomClient : "Client inconnu"}
                </span>
                {item.visible === false ? (
                  <RiArrowDownSFill className="arrow-list"></RiArrowDownSFill>
                ) : (
                  <RiArrowRightSFill className="arrow-list"></RiArrowRightSFill>
                )}
              </li>
            )
          ) : (
            <li>
              <span className="title-list" onClick={(e) => toggleNomClient(e)}>
                {item.nomClient !== null ? item.nomClient : "Client inconnu"}
              </span>
              {item.visible === false ? (
                <RiArrowDownSFill className="arrow-list"></RiArrowDownSFill>
              ) : (
                <RiArrowRightSFill className="arrow-list"></RiArrowRightSFill>
              )}
            </li>
          )}
          {item.visible === false ? (
            ""
          ) : (
            <ul className="list-historique">
              <li>
                <div>
                  <div>
                    Date création :{" "}
                    {item.date === null ? (
                      <span className="date-BL">? </span>
                    ) : (
                      <span className="date-BL">{item.date} </span>
                    )}
                  </div>
                  <div>
                    Numéro Carnet :{" "}
                    {item.numeroCarnet === null ? (
                      <span className="num-carnet">? </span>
                    ) : (
                      <span className="num-carnet">{item.numeroCarnet} </span>
                    )}
                  </div>
                  <div>
                    Numéro BL :{" "}
                    {item.numeroBl === null ? (
                      <span className="num-bl">? </span>
                    ) : (
                      <span className="num-bl">{item.numeroBl} </span>
                    )}
                  </div>
                </div>
                <div>
                  Client :{" "}
                  {item.nomClient === null ? (
                    <span className="nom-client">? </span>
                  ) : (
                    <span className="nom-client">{item.nomClient} </span>
                  )}
                </div>
                <div>
                  <span>Validé ? </span>
                  {item.valide === "oui" ? (
                    <RiCheckboxLine
                      data-id={item.id}
                      onClick={(e) => changeValide(e)}
                      className="valide-check"
                    ></RiCheckboxLine>
                  ) : (
                    <RiCheckboxBlankLine
                      data-id={item.id}
                      onClick={(e) => changeValide(e)}
                      className="valide-check"
                    ></RiCheckboxBlankLine>
                  )}
                </div>
              </li>
            </ul>
          )}
        </div>
      ))}
    </>
  );
}

export default TriParClient;
