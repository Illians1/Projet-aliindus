import React, { useState, useEffect } from "react";
import ListUsers from "./LeftBlock/ListUsers";
import RightBlockUsers from "./RightBlock/RightBlockUsers";
import ContextUsers from "../Context/ContextUsers";
import axios from "axios";

function Users(props) {
  const [affichageUsers, setAffichageUsers] = useState([]);
  const [affichageBloc, setAffichageBloc] = useState("");
  const [listUsers, setListUsers] = useState([]);
  const [errorAccount, setErrorAccount] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  useEffect(() => {
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
    dataUsers();
  }, []);

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    pseudo: "",
    role: "user",
    password: "",
    repeatPassword: "",
  });

  const contextValue = {
    listUsers,
    setListUsers,
    affichageUsers,
    setAffichageUsers,
    affichageBloc,
    setAffichageBloc,
    formData,
    setFormData,
    errorAccount,
    setErrorAccount,
    errorPassword,
    setErrorPassword,
  };

  return (
    <ContextUsers.Provider value={contextValue}>
      <ListUsers filtre={props.match.params.filter} />
      <RightBlockUsers />
    </ContextUsers.Provider>
  );
}

export default Users;
