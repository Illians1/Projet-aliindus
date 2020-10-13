import React from "react";
import "../css/App.css";
import { NavLink } from "react-router-dom";

function Auth() {
  return (
    <div className="wrapper">
      <div id="formContent">
        <p>Connectez-vous</p>
        <form>
          <input
            type="text"
            id="login"
            className="fadeIn second"
            name="login"
            placeholder="Nom de compte"
          />
          <input
            type="text"
            id="password"
            className="fadeIn third"
            name="login"
            placeholder="Mot de passe"
          />
          <input type="submit" className="fadeIn fourth" value="Se connecter" />
        </form>
        <div id="formFooter">
          <a className="underlineHover" href="google.com">
            Mot de passe oublié ?
          </a>
        </div>
      </div>
    </div>
  );
}

export default Auth;
