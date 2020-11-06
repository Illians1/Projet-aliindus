import React, { useEffect, useState, useContext } from "react";
import ListClients from "./LeftBlock/ListClients";
import RightBlockClients from "./RightBlock/RightBlockClients";
import ContextClients from "../Context/ContextClients";
import ContextClientsUsers from "../Context/ContextClientsUsers";

function Clients(props) {
  const [affichageClients, setViewClients] = useState([]);
  const [affichageValid, setAffichageValid] = useState(true);
  const [affichageBloc, setAffichageBloc] = useState("");

  const [formData, setFormData] = useState({
    nom: "",
    code: "",
    adresse: "",
    ville: "",
    codePostal: "",
    departement: "",
  });
  const { listClients, listBL } = useContext(ContextClientsUsers);

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
