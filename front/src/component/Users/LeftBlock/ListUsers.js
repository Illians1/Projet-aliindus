import React, { useEffect, useContext } from "react";
import axios from "axios";
import ContextUsers from "../../Context/ContextUsers";
import ModifyUser from "./ModifyUser";
import TitleListUsers from "./TitleListUsers";

function ListUsers() {
  const { setAffichageUsers, affichageUsers, setListUsers } = useContext(
    ContextUsers
  );

  useEffect(() => {
    const fetchData = async () => {
      const client = await axios.get(`http://localhost:3001/api/user/`, {
        headers: {
          Authorization: localStorage.getItem("user"),
        },
      });
      setListUsers(client.data.results);
      setAffichageUsers(client.data.results);
    };
    fetchData();
  }, []);

  return (
    <div className="historique-bl">
      <div className="texte-historique">
        <div className="title-users">Liste des utilisateurs :</div>
        <div className="header-historique"></div>
        {affichageUsers.map((item, index) => (
          <div key={index}>
            <TitleListUsers item={item} />
            <ul className="list-historique">
              {item.visible === false ? (
                ""
              ) : (
                <li>
                  <div>
                    Role :{" "}
                    {item.role === null ? (
                      <span className="date-BL">? </span>
                    ) : (
                      <span className="date-BL">{item.role} </span>
                    )}
                  </div>
                  <ModifyUser item={item} />
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListUsers;
