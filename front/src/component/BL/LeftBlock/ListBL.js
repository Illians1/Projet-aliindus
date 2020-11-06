import React, { useEffect, useContext } from "react";
import axios from "axios";
import ContextBL from "../../Context/ContextBL";
import ModifyBL from "./ModifyBL";
import TitleListBL from "./TitleListBL";
import ValidBL from "./ValidBL";
import NumeroCarnetBL from "./NumeroCarnetBL";
import NumeroBLBL from "./NumeroBLBL";
import ClientBL from "./ClientBL";
import DateCreationBL from "./DateCreationBL";

function ListBL() {
  const { affichageBL, setAffichageBL, setListBL, triBL } = useContext(
    ContextBL
  );

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        triBL === "date"
          ? `http://localhost:3001/api/bl`
          : `http://localhost:3001/api/BL/client`
      );
      setAffichageBL(result.data.results);
      setListBL(result.data.results);
    };
    fetchData();
  }, [triBL]);

  const changeTitleBL = (index) => {
    return triBL === "date"
      ? affichageBL[index].date === affichageBL[index - 1].date
      : affichageBL[index].nomClient === affichageBL[index - 1].nomClient;
  };

  return (
    <>
      {affichageBL.map((item, index) => (
        <div key={index}>
          {index > 0 ? (
            changeTitleBL(index) ? (
              ""
            ) : (
              <TitleListBL item={item} />
            )
          ) : (
            <TitleListBL item={item} />
          )}
          <ul className="list-historique">
            {item.visible === false ? (
              ""
            ) : (
              <li className="list-historique">
                {triBL === "date" ? (
                  <>
                    <NumeroCarnetBL item={item} />
                    <NumeroBLBL item={item} />
                    <ClientBL item={item} />
                  </>
                ) : (
                  <>
                    {" "}
                    <DateCreationBL item={item} />
                    <NumeroCarnetBL item={item} />
                    <NumeroBLBL item={item} />{" "}
                  </>
                )}
                <ValidBL item={item} />
                <ModifyBL item={item} />
              </li>
            )}
          </ul>
        </div>
      ))}
    </>
  );
}

export default ListBL;
