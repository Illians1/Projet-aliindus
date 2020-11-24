import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";

function Auth(props) {
  const [formData, setFormData] = useState({ login: "", password: "" });
  const [errorLogin, setErrorLogin] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const setPseudo = props.setPseudo;

  const newFormData = (e) => {
    let newForm = Object.assign({}, formData);
    newForm[e.target.name] = e.target.value;
    setFormData(newForm);
    setErrorLogin("");
    setErrorPassword("");
  };

  const formSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3001/api/user/login/`, {
        login: formData.login,
        password: formData.password,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        setPseudo(res.data.pseudo);
        window.location.reload();
      })
      .catch((error) => {
        if (error.response && error.response.data.errorLogin) {
          setErrorLogin(error.response.data.errorLogin);
        } else if (error.response && error.response.data.errorPassword) {
          setErrorPassword(error.response.data.errorPassword);
        }
      });
  };

  return (
    <div className="wrapper">
      <div id="formContent">
        <p>Connectez-vous</p>
        <form onSubmit={formSubmit}>
          <Form.Group>
            <input
              type="text"
              id="login"
              value={formData.login}
              className="inputTextAuth"
              name="login"
              onChange={newFormData}
              placeholder="Nom de compte"
              required
            />
            <Form.Label className="date-BL">{errorLogin}</Form.Label>
          </Form.Group>
          <Form.Group>
            <input
              type="password"
              id="password"
              className="inputTextAuth"
              name="password"
              value={formData.password}
              placeholder="Mot de passe"
              onChange={newFormData}
              required
            />
            <Form.Label className="date-BL">{errorPassword}</Form.Label>
          </Form.Group>
          <input type="submit" className="fadeIn fourth" value="Se connecter" />
        </form>
      </div>
    </div>
  );
}

export default Auth;
