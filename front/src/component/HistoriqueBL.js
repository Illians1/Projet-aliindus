import React, { useState, useEffect } from "react";
import "../css/App.css";
import Form from "react-bootstrap/Form";
import { RiArrowRightSFill, RiArrowDownSFill } from "react-icons/ri";
import axios from "axios";
import LeftElementHeader from "./LeftElementHeader";

function HistoriqueBL(props) {
  const [listBL, setListBL] = useState([]);
  const [apiLink, setApiLink] = useState("BL");
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:3000/api/${apiLink}`);
      setListBL(result.data.results);
    };
    fetchData();
  }, []);
  const toggleDate = (e) => {
    const newBL = new Array();
    listBL.forEach((element) => {
      if (element.date == e.target.innerHTML) {
        element.id == null ? (element.id = 1) : (element.id = null);
      }
      newBL.push(element);
    });
    setListBL(newBL);
  };

  return (
    <div className="historique-bl">
      <div className="texte-historique">
        <div className="header-historique">
          <LeftElementHeader listBL={listBL} />
          <div>
            <span>Afficher BL validés ? </span>
            <div className="historique-checkbox">
              <Form.Check type={"switch"} id={"custom-switch"} label={""} />
            </div>
          </div>
        </div>
        <ul>
          {listBL.map((item, index) => (
            <div key={index}>
              {index > 0 ? (
                listBL[index].date == listBL[index - 1].date ? (
                  ""
                ) : (
                  <li className="title-list">
                    <span onClick={(e) => toggleDate(e)}>{item.date}</span>
                    {item.id == null ? (
                      <RiArrowDownSFill className="arrow-list"></RiArrowDownSFill>
                    ) : (
                      <RiArrowRightSFill className="arrow-list"></RiArrowRightSFill>
                    )}
                  </li>
                )
              ) : (
                <li className="title-list">
                  <span onClick={(e) => toggleDate(e)}>{item.date}</span>
                  {item.id == null ? (
                    <RiArrowDownSFill className="arrow-list"></RiArrowDownSFill>
                  ) : (
                    <RiArrowRightSFill className="arrow-list"></RiArrowRightSFill>
                  )}
                </li>
              )}
              {item.id == null ? (
                ""
              ) : (
                <ul id={item.id} className="list-historique">
                  <li>
                    <div>
                      <div>
                        Numéro Carnet :{" "}
                        {item.numeroCarnet == null ? (
                          <span className="num-carnet">? </span>
                        ) : (
                          <span className="num-carnet">
                            {item.numeroCarnet}{" "}
                          </span>
                        )}
                      </div>
                      <div>
                        Numéro BL :{" "}
                        {item.numeroBl == null ? (
                          <span className="num-bl">? </span>
                        ) : (
                          <span className="num-bl">{item.numeroBl} </span>
                        )}
                      </div>
                    </div>
                    <div>
                      Client :{" "}
                      {item.nomClient == null ? (
                        <span className="nom-client">? </span>
                      ) : (
                        <span className="nom-client">{item.nomClient} </span>
                      )}
                    </div>
                  </li>
                </ul>
              )}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HistoriqueBL;

/* if (
  a.nomClient != null &&
  b.nomClient != null &&
  a.nomClient.localeCompare(b.nomClient) != 0
) {
  return a.nomClient.localeCompare(b.nomClient);
} else if (
  a.nomClient != null &&
  b.nomClient != null &&
  a.nomClient.localeCompare(b.nomClient) == 0
) {
  if (a.numeroCarnet < b.numeroCarnet) {
    return -1;
  } else if (a.numeroCarnet == b.numeroCarnet) {
    if (a.numeroBL < b.numeroBL) {
      return -1;
    } else {
      return 1;
    }
  }
} */
