import React, { useEffect, useState } from "react";
import ListClients from "./LeftBlock/ListClients";
import RightBlockClients from "./RightBlock/RightBlockClients";
import ContextClients from "../Context/ContextClients";
import axios from "axios";

function Clients(props) {
  const [affichageClients, setViewClients] = useState([]);
  const [affichageValid, setAffichageValid] = useState(true);
  const [affichageBloc, setAffichageBloc] = useState("");
  const [listBL, setListBL] = useState([]);
  const [listClients, setListClients] = useState([]);

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
    dataBL();
    dataClients();
  }, []);

  const [formData, setFormData] = useState({
    nom: "",
    code: "",
    adresse: "",
    ville: "",
    codePostal: "",
    departement: "",
  });

  const setAffichageClients = (items) => {
    const filter = (bl, client) => {
      let filtre = 0;
      bl.forEach((element) => {
        if (element.valide === "non" && element.codeClient === client.code) {
          filtre = 1;
        }
      });
      return filtre === 1 ? true : false;
    };
    let filteredClients = [];
    let allClients = [];
    items.forEach((element) => {
      allClients.push(element);
    });
    if (affichageValid !== true) {
      console.log("filtre");
      filteredClients = allClients.filter((client) => filter(listBL, client));
    } else {
      filteredClients = allClients;
    }
    setViewClients(filteredClients);
  };

  const contextValue = {
    listClients,
    setListClients,
    listBL,
    affichageClients,
    setAffichageClients,
    setAffichageValid,
    affichageBloc,
    setAffichageBloc,
    formData,
    setFormData,
  };

  useEffect(() => {
    setAffichageClients(listClients);
  }, [affichageValid, listBL, listClients]);

  return (
    <ContextClients.Provider value={contextValue}>
      <ListClients filtre={props.match.params.filter} />
      <RightBlockClients />
    </ContextClients.Provider>
  );
}

export default Clients;
