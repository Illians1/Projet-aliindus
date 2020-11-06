import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer";
import BonLivraison from "../BL/BonLivraison";
import Auth from "../Users/Auth";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import ContextClientsUsers from "../Context/ContextClientsUsers";
import ScrollToTop from "./ScrollToTop";
import Clients from "../Clients/Clients";

function App() {
  const [listClients, setListClients] = useState([]);
  const [listUsers, setListUsers] = useState([]);
  const [listBL, setListBL] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const bl = await axios.get(`http://localhost:3001/api/bl`);
      const client = await axios.get(`http://localhost:3001/api/client`);
      const utilisateur = await axios.get(`http://localhost:3001/api/user`);
      setListBL(bl.data.results);
      setListClients(client.data.results);
      setListUsers(utilisateur.data.results);
    };
    fetchData();
  }, []);

  const contextValue = {
    listClients,
    listUsers,
    setListClients,
    setListUsers,
    listBL,
    setListBL,
  };
  return (
    <div style={{ background: "#B8B8B7" }}>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <div className="main">
          <ContextClientsUsers.Provider value={contextValue}>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/bl" />} />
              <Route path="/auth" render={(props) => <Auth {...props} />} />
              <Route
                path="/bl/:filter?"
                render={(props) => <BonLivraison {...props} />}
              />
              <Route
                path="/clients"
                render={(props) => <Clients {...props} />}
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
