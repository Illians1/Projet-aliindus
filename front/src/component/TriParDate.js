import React, { useEffect, useContext } from "react";
import "../css/App.css";
import axios from "axios";
import ContextBL from "./ContextBL";
import ModifyBL from "./ModifyBL";
import TitleListBL from "./TitleListBL";
import ValidBL from "./ValidBL";

function TriParDate(props) {
  const { affichageBL, setListBL, setAffichageBL } = useContext(ContextBL);

  const changeButton = props.changeButton;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:3001/api/bl`);
      setListBL(result.data.results);
      setAffichageBL(result.data.results);
    };
    changeButton("Date de création");
    fetchData();
  }, []);

  return (
    <>
      {affichageBL.map((item, index) => (
        <div key={index}>
          {index > 0 ? (
            affichageBL[index].date === affichageBL[index - 1].date ? (
              ""
            ) : (
                <TitleListBL type={"date"} item={item} />
              )
          ) : (
              <TitleListBL type={"date"} item={item} />
            )}
          {item.visible === false ? (
            ""
          ) : (
              <ul id={item.id} className="list-historique">
                <li>
                  <div>
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
                    <ValidBL item={item} />
                    <ModifyBL item={item} />
                  </div>
                </li>
              </ul>
            )}
        </div>
      ))}
    </>
  );
}

export default TriParDate;
