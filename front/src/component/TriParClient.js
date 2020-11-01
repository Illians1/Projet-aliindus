import React, { useEffect, useContext } from "react";
import "../css/App.css";
import axios from "axios";
import ContextBL from "./ContextBL";
import ModifyBL from "./ModifyBL";
import TitleListBL from "./TitleListBL";
import ValidBL from "./ValidBL";

function TriParClient(props) {
  const { affichageBL, setListBL, setAffichageBL } = useContext(ContextBL);

  const changeButton = props.changeButton;
  useEffect(() => {
    changeButton("Client");
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:3001/api/BL/client`);
      setListBL(result.data.results);
      setAffichageBL(result.data.results);
    };
    fetchData();
  }, []);

  return (
    <>
      {affichageBL.map((item, index) => (
        <div key={index}>
          {index > 0 ? (
            affichageBL[index].nomClient ===
              affichageBL[index - 1].nomClient ? (
                ""
              ) : (
                <TitleListBL type={"client"} item={item} />
              )
          ) : (
              <TitleListBL type={"client"} item={item} />
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

export default TriParClient;
