import React, { useState, useEffect } from "react";
import "../css/App.css";
import HistoriqueBL from "./HistoriqueBL";
import RightBlockBL from "./RightBlockBL";
import ContextBL from "./ContextBL";

function BonLivraison(props) {
  const todayDate = () => {
    const date = new Date(Date.now());
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    let newDate = [
      date.getFullYear(),
      pad(date.getMonth() + 1),
      pad(date.getDate()),
    ].join("-");
    console.log(newDate);
    return newDate;
  };

  const [formData, setFormData] = useState({
    client: "",
    date: todayDate(),
    user: "admin admin",
    numCarnet: "",
    numBL: "",
    infos: " ",
  });

  const [listBL, setListBL] = useState([]);
  const [affichageBL, setViewBL] = useState([]);
  const [affichageBloc, setAffichageBloc] = useState("");
  const [affichageValid, setAffichageValid] = useState(true);

  const setAffichageBL = (items) => {
    let filteredBL = [];
    let allBL = [];
    items.forEach((element) => {
      allBL.push(element);
    });
    if (affichageValid !== true) {
      filteredBL = allBL.filter((BL) => BL.valide !== "oui");
    } else {
      filteredBL = allBL;
    }
    setViewBL(filteredBL);
  };

  /* const handleAffichageBL = () => {
    setAffichageBL(listBL);
  };

  useEffect(handleAffichageBL, [affichageValid]); */

  const contextValue = {
    listBL,
    affichageBL,
    setListBL,
    setAffichageBL,
    affichageBloc,
    setAffichageBloc,
    formData,
    setFormData,
    todayDate,
    setAffichageValid,
    affichageValid,
  };

  return (
    <ContextBL.Provider value={contextValue}>
      <HistoriqueBL filtre={props.match.params.filter} />
      <RightBlockBL />
    </ContextBL.Provider>
  );
}

export default BonLivraison;
