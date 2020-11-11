import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer";
import BonLivraison from "../BL/BonLivraison";
import Auth from "./Auth";
import Users from "../Users/Users";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import Clients from "../Clients/Clients";

function App() {
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
    <div style={{ background: "#B8B8B7" }}>
      <BrowserRouter>
        <ScrollToTop />
        <Header isAuthenticated={isAuthenticated} />
        <div className="main">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/bl" />} />
            <Route
              path="/auth"
              render={(props) =>
                isAuthenticated() === true ? (
                  <Redirect to="/bl" />
                ) : (
                  <Auth {...props} />
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
