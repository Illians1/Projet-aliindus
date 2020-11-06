import React, { useState, useEffect, useContext } from "react";
import HistoriqueBL from "./LeftBlock/HistoriqueBL";
import RightBlockBL from "./RightBlock/RightBlockBL";
import ContextBL from "../Context/ContextBL";
import ContextClientsUsers from "../Context/ContextClientsUsers";

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

  const { listBL, setListBL } = useContext(ContextClientsUsers);
  const [affichageBL, setViewBL] = useState([]);
  const [affichageBloc, setAffichageBloc] = useState("");
  const [affichageValid, setAffichageValid] = useState(true);
  const [triBL, setTriBL] = useState("date");

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

  useEffect(() => {
    setAffichageBL(listBL);
  }, [affichageValid]);

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
    triBL,
    setTriBL,
  };

  return (
    <ContextBL.Provider value={contextValue}>
      <HistoriqueBL filtre={props.match.params.filter} />
      <RightBlockBL />
    </ContextBL.Provider>
  );
}

export default BonLivraison;
