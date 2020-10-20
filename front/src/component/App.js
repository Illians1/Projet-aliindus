import React, { useEffect, useState } from "react";
import NavBar from "./Navbar";
import Footer from "./Footer";
import BonLivraison from "./BonLivraison";
import Auth from "./Auth";
import "../css/App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import ContextClientsUsers from "./ContextClientsUsers";

function App() {
  const [listClients, setListClients] = useState([]);
  const [listUsers, setListUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const client = await axios.get(`http://localhost:3000/api/client`);
      const utilisateur = await axios.get(`http://localhost:3000/api/user`);
      setListClients(client.data.results);
      setListUsers(utilisateur.data.results);
    };
    fetchData();
  }, []);
  const contextValue = {
    listClients,
    listUsers,
  };
  console.log(listUsers);
  return (
    <div style={{ background: "#B8B8B7" }}>
      <BrowserRouter>
        <NavBar />
        <div className="main">
          <ContextClientsUsers.Provider value={contextValue}>
            <Switch>
              <Route path="/auth" render={(props) => <Auth {...props} />} />
              <Route
                path="/bl/:filter?"
                render={(props) => <BonLivraison {...props} />}
              />
            </Switch>
          </ContextClientsUsers.Provider>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
