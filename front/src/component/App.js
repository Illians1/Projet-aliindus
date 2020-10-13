import React from "react";
import NavBar from "./Navbar";
import Footer from "./Footer";
import BonLivraison from "./BonLivraison";
import Auth from "./Auth";
import "../css/App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div style={{ background: "#B8B8B7" }}>
      <BrowserRouter>
        <NavBar />
        <div className="main">
          <Switch>
            <Route path="/auth" render={(props) => <Auth {...props} />} />
            <Route
              path="/bl/:filter?"
              render={(props) => <BonLivraison {...props} />}
            />
          </Switch>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
