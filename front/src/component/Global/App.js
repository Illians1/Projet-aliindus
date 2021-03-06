import React, { useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer";
import BonLivraison from "../BL/BonLivraison";
import Auth from "./Auth";
import Users from "../Users/Users";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import Clients from "../Clients/Clients";

function App() {
  const [pseudo, setPseudo] = useState("");

  const isAuthenticated = () => {
    return localStorage.getItem("user") ? true : false;
  };

  const isAdmin = () => {
    if (localStorage.getItem("user")) {
      const userData = JSON.parse(localStorage.getItem("user"));
      return userData.userRole === "admin" ? true : false;
    }
    return false;
  };

  return (
    <div
      style={{ background: "#B8B8B7" }}
      className="p-0 container-fluid main position-relative"
    >
      <BrowserRouter>
        <ScrollToTop />
        <Header isAuthenticated={isAuthenticated} isAdmin={isAdmin} pseudo={pseudo} setPseudo={setPseudo} />
        <div className="row main-element m-0">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/bl" />} />
            <Route
              path="/auth"
              render={(props) =>
                isAuthenticated() === true ? (
                  <Redirect to="/bl" />
                ) : (
                    <Auth {...props} setPseudo={setPseudo} />
                  )
              }
            />
            <Route
              path="/bl/:filter?"
              render={(props) =>
                isAuthenticated() === true ? (
                  <BonLivraison {...props} />
                ) : (
                    <Redirect to="/auth" />
                  )
              }
            />
            <Route
              path="/clients"
              render={(props) =>
                isAuthenticated() === true ? (
                  <Clients {...props} />
                ) : (
                    <Redirect to="/auth" />
                  )
              }
            />
            <Route
              path="/users"
              render={(props) =>
                isAdmin() === true ? (
                  <Users {...props} />
                ) : (
                    <Redirect to="/auth" />
                  )
              }
            />
          </Switch>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
