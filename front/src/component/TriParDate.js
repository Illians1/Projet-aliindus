import React, { useEffect } from "react";
import "../css/App.css";
import { RiArrowRightSFill, RiArrowDownSFill } from "react-icons/ri";
import axios from "axios";

function TriParDate(props) {
  useEffect(() => {
    props.changeButton("Date de création");
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:3000/api/BL`);
      props.triBL(result.data.results);
    };
    fetchData();
  }, []);

  const toggleDate = (e) => {
    const newBL = new Array();
    props.listBL.forEach((element) => {
      if (element.date == e.target.innerHTML) {
        element.visible != false
          ? (element.visible = false)
          : (element.visible = true);
      }
      newBL.push(element);
    });
    props.triBL(newBL);
  };

  return (
    <>
      {props.listBL.map((item, index) => (
        <div key={index}>
          {index > 0 ? (
            props.listBL[index].date == props.listBL[index - 1].date ? (
              ""
            ) : (
              <li className="title-list">
                <span onClick={(e) => toggleDate(e)}>{item.date}</span>
                {item.visible == false ? (
                  <RiArrowDownSFill className="arrow-list"></RiArrowDownSFill>
                ) : (
                  <RiArrowRightSFill className="arrow-list"></RiArrowRightSFill>
                )}
              </li>
            )
          ) : (
            <li className="title-list">
              <span onClick={(e) => toggleDate(e)}>{item.date}</span>
              {item.visible == false ? (
                <RiArrowDownSFill className="arrow-list"></RiArrowDownSFill>
              ) : (
                <RiArrowRightSFill className="arrow-list"></RiArrowRightSFill>
              )}
            </li>
          )}
          {item.visible == false ? (
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
                      <span className="num-carnet">{item.numeroCarnet} </span>
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
    </>
  );
}

export default TriParDate;
