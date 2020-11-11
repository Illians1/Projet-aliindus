import React, { useEffect, useContext } from "react";
import axios from "axios";
import TitleListClients from "./TitleListClients";
import DepartementClient from "./DepartementClient";
import VilleClient from "./VilleClient";
import CodePostalClient from "./CodePostalClient";
import AdresseClient from "./AdresseClient";
import FilterClients from "./FilterClients";
import ButtonDisplayValidClient from "./ButtonDisplayValidClient";
import ListeBLNonValides from "./ListeBLNonValides";
import ContextClients from "../../Context/ContextClients";
import ModifyClient from "./ModifyClient";

function ListClients() {
  const { affichageClients, setAffichageClients, setListClients } = useContext(
    ContextClients
  );

  useEffect(() => {
    const fetchData = async () => {
      const client = await axios
        .get(`http://localhost:3001/api/client`, {
          headers: {
            Authorization: localStorage.getItem("user"),
          },
        })
        .then((res) => {
          setListClients(client.data.results);
          setAffichageClients(client.data.results);
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
    fetchData();
  }, []);

  return (
    <div className="historique-bl">
      <div className="texte-historique">
        <div className="header-historique">
          <FilterClients />
          <ButtonDisplayValidClient />
        </div>
        {affichageClients.map((item, index) => (
          <div key={index}>
            <TitleListClients item={item} />
            <ul className="list-historique">
              {item.visible === false ? (
                ""
              ) : (
                <li>
                  <DepartementClient item={item} />
                  <AdresseClient item={item} />
                  <CodePostalClient item={item} />
                  <VilleClient item={item} />
                  <ListeBLNonValides item={item} />
                  <ModifyClient item={item} />
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListClients;
