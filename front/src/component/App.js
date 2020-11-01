import React, { useEffect, useState } from "react";
import NavBar from "./Navbar";
import Footer from "./Footer";
import BonLivraison from "./BonLivraison";
import Auth from "./Auth";
import "../css/App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import ContextClientsUsers from "./ContextClientsUsers";
import ScrollToTop from "./ScrollToTop";

function App() {
  const [listClients, setListClients] = useState([]);
  const [listUsers, setListUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const client = await axios.get(`http://localhost:3001/api/client`);
      const utilisateur = await axios.get(`http://localhost:3001/api/user`);
      setListClients(client.data.results);
      setListUsers(utilisateur.data.results);
    };
    fetchData();
  }, []);
  const contextValue = {
    listClients,
    listUsers,
  };
  return (
    <div style={{ background: "#B8B8B7" }}>
      <BrowserRouter>
        <ScrollToTop />
        <NavBar />
        <div className="main">
          <ContextClientsUsers.Provider value={contextValue}>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/bl/bl" />} />
              <Route path="/auth" render={(props) => <Auth {...props} />} />
              <Route
                path="/bl/bl/:filter?"
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
