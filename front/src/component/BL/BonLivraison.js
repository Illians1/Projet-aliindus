import React, { useState, useEffect, useContext } from "react";
import HistoriqueBL from "./LeftBlock/HistoriqueBL";
import RightBlockBL from "./RightBlock/RightBlockBL";
import ContextBL from "../Context/ContextBL";
import axios from "axios";

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
    user: "admin.admin",
    numCarnet: "",
    numBL: "",
    infos: " ",
  });

  const [listBL, setListBL] = useState([]);
  const [listClients, setListClients] = useState([]);
  const [listUsers, setListUsers] = useState([]);
  const [affichageBL, setViewBL] = useState([]);
  const [affichageBloc, setAffichageBloc] = useState("");
  const [affichageValid, setAffichageValid] = useState(true);
  const [triBL, setTriBL] = useState("date");
  const [errorClient, setErrorClient] = useState("");

  useEffect(() => {
    const dataBL = async () => {
      await axios
        .get(`http://localhost:3001/api/bl`, {
          headers: {
            Authorization: localStorage.getItem("user"),
          },
        })
        .then((res) => {
          setListBL(res.data.results);
        })
        .catch((error) => {
          if (error.response && error.response.data.authError) {
            if (localStorage.getItem("user")) {
              localStorage.removeItem("user");
            }
            window.location.reload();
          }
        });
    };
    const dataClients = async () => {
      await axios
        .get(`http://localhost:3001/api/client`, {
          headers: {
            Authorization: localStorage.getItem("user"),
          },
        })
        .then((res) => {
          setListClients(res.data.results);
        })
        .catch((error) => {
          if (error.response && error.response.data.authError) {
            if (localStorage.getItem("user")) {
              localStorage.removeItem("user");
            }
            window.location.reload();
          }
        });
    };
    const dataUsers = async () => {
      await axios
        .get(`http://localhost:3001/api/user`, {
          headers: {
            Authorization: localStorage.getItem("user"),
          },
        })
        .then((res) => {
          setListUsers(res.data.results);
        })
        .catch((error) => {
          if (error.response && error.response.data.authError) {
            if (localStorage.getItem("user")) {
              localStorage.removeItem("user");
            }
            window.location.reload();
          }
        });
    };
    dataBL();
    dataClients();
    dataUsers();
  }, []);

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
    listClients,
    listUsers,
    setListClients,
    setListUsers,
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
    errorClient,
    setErrorClient,
  };

  return (
    <ContextBL.Provider value={contextValue}>
      <HistoriqueBL filtre={props.match.params.filter} />
      <RightBlockBL />
    </ContextBL.Provider>
  );
}

export default BonLivraison;
