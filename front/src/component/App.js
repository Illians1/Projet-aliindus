import React from "react";
import NavBar from "./Navbar";
import Footer from "./Footer";
import Auth from "./Auth";
import "../css/App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/auth" component={Auth} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
