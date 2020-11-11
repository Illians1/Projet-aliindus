import React, { useState } from "react";
import axios from "axios";

function Auth() {
  const [formData, setFormData] = useState({ login: "", password: "" });

  const newFormData = (e) => {
    let newForm = Object.assign({}, formData);
    newForm[e.target.name] = e.target.value;
    setFormData(newForm);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3001/api/user/login/`, {
        login: formData.login,
        password: formData.password,
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        window.location.reload();
      });
  };

  return (
    <div className="wrapper">
      <div id="formContent">
        <p>Connectez-vous</p>
        <form onSubmit={formSubmit}>
          <input
            type="text"
            id="login"
            value={formData.login}
            className="inputTextAuth"
            name="login"
            onChange={newFormData}
            placeholder="Nom de compte"
          />
          <input
            type="text"
            id="password"
            className="fadeIn third"
            name="password"
            value={formData.password}
            placeholder="Mot de passe"
            onChange={newFormData}
          />
          <input type="submit" className="fadeIn fourth" value="Se connecter" />
        </form>
      </div>
    </div>
  );
}

export default Auth;
