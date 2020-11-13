import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ContextUsers from "../../Context/ContextUsers";
import DropdownRoles from "./DropdownRoles";

function FormUsers() {
  const {
    affichageBloc,
    formData,
    setFormData,
    errorAccount,
    setErrorAccount,
  } = useContext(ContextUsers);

  const autoComplete = () => {
    let newForm = Object.assign({}, formData);
    const nom = newForm.nom !== undefined ? newForm.nom.toLowerCase() : "";
    const prenom =
      newForm.prenom !== undefined ? newForm.prenom.toLowerCase() : "";
    if (nom !== "" || prenom !== "") {
      newForm["pseudo"] = nom + "." + prenom;
    }
    setFormData(newForm);
  };

  const newFormData = (e) => {
    let newForm = Object.assign({}, formData);
    newForm[e.target.name] = e.target.value;
    setFormData(newForm);
    setErrorAccount("");
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    let id = affichageBloc.pseudo;
    const nom =
      formData.nom !== "" ? capitalizeFirstLetter(formData.nom) : formData.nom;
    const prenom =
      formData.prenom !== ""
        ? capitalizeFirstLetter(formData.prenom)
        : formData.prenom;
    const password1 = formData.password;
    const password2 = formData.repeatPassword;
    affichageBloc === ""
      ? axios
          .post(
            `http://localhost:3001/api/user/signup/`,
            {
              prenom: prenom,
              nom: nom,
              login: formData.pseudo,
              password1: password1,
              password2: password2,
              role: formData.role,
            },
            {
              headers: {
                Authorization: localStorage.getItem("user"),
              },
            }
          )
          .then((res) => {
            console.log(res);
            console.log(res.data);
            window.location.reload();
          })
          .catch((error) => {
            if (error.response && error.response.data.authError) {
              if (localStorage.getItem("user")) {
                localStorage.removeItem("user");
              }
              window.location.reload();
            }
            if (error.response && error.response.data.errorAccount) {
              setErrorAccount(error.response.data.errorAccount);
            }
          })
      : axios
          .put(
            `http://localhost:3001/api/user/modify/`,
            {
              id: id,
              prenom: prenom,
              nom: nom,
              password1: password1,
              password2: password2,
              role: formData.role,
            },
            {
              headers: {
                Authorization: localStorage.getItem("user"),
              },
            }
          )
          .then((res) => {
            console.log(res);
            console.log(res.data);
            window.location.reload();
          })
          .catch((error) => {
            if (error.response && error.response.data.authError) {
              if (localStorage.getItem("user")) {
                localStorage.removeItem("user");
              }
              window.location.reload();
            }
          });
  };

  const confirmerDelete = () => {
    let id = affichageBloc.pseudo;
    if (window.confirm("Etes-vous sûr de vouloir supprimer l'utilisateur' ?")) {
      axios
        .delete(`http://localhost:3001/api/user/delete/`, {
          params: { id: id },
          headers: {
            Authorization: localStorage.getItem("user"),
          },
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          window.location.reload();
        })
        .catch((error) => {
          if (error.response && error.response.data.authError) {
            if (localStorage.getItem("user")) {
              localStorage.removeItem("user");
            }
            console.log(error.response);
            window.location.reload();
          }
        });
    }
  };

  return (
    <Form onSubmit={formSubmit}>
      <Form.Row>
        <Form.Group as={Col} className="text-center">
          <Form.Label>Nom :</Form.Label>
          <Form.Control
            value={formData.nom}
            className="border border-secondary"
            placeholder="Nom de l'utilisateur"
            type="text"
            name="nom"
            onChange={newFormData}
            required
          />
        </Form.Group>
        <Form.Group as={Col} className="text-center">
          <Form.Label>Prénom :</Form.Label>
          <Form.Control
            value={formData.prenom}
            className="border border-secondary"
            type="text"
            name="prenom"
            placeholder="Prénom de l'utilisateur"
            onChange={newFormData}
            required
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        {affichageBloc === "" ? (
          <Form.Group id="autocomplete" as={Col} className="text-center">
            <Form.Label>Nom de compte :</Form.Label>
            <Form.Control
              value={formData.pseudo}
              className="border border-secondary"
              type="text"
              name="pseudo"
              placeholder="Pseudo"
              onChange={newFormData}
              onFocus={autoComplete}
              required
            />
            {errorAccount !== "" ? (
              <Form.Label className="date-BL">{errorAccount}</Form.Label>
            ) : (
              ""
            )}
          </Form.Group>
        ) : (
          ""
        )}
        <DropdownRoles formData={formData} setFormData={newFormData} />
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} className="text-center">
          <Form.Label>Mot de passe :</Form.Label>
          <Form.Control
            value={formData.password}
            className="border border-secondary text-center"
            placeholder="Mot de passe"
            type="password"
            name="password"
            onChange={newFormData}
            required
          />
        </Form.Group>
        <Form.Group as={Col} className="text-center">
          <Form.Label>Répeter le mot de passe</Form.Label>
          <Form.Control
            value={formData.repeatPassword}
            className="border border-secondary text-center"
            type="password"
            placeholder="Répeter le mot de passe"
            name="repeatPassword"
            onChange={newFormData}
            required
          />
        </Form.Group>
      </Form.Row>
      <Form.Group
        as={Row}
        className="d-flex justify-content-center text-center"
      >
        <div className="button-create-bl">
          <Button size="lg" variant="primary" type="submit" block>
            {affichageBloc === ""
              ? "Créer l'utilisateur"
              : "Modifier l'utilisateur"}
          </Button>
          {affichageBloc === "" ? (
            ""
          ) : (
            <Button size="lg" variant="danger" onClick={confirmerDelete} block>
              Supprimer l'utilisateur
            </Button>
          )}
        </div>
      </Form.Group>
    </Form>
  );
}

export default FormUsers;
