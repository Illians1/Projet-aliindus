import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DropdownClients from "./DropdownClients";
import DropdownUsers from "./DropdownUsers";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ContextBL from "../../Context/ContextBL";

function FormBL(props) {
  const {
    affichageBloc,
    formData,
    setFormData,
    listUsers,
    listClients,
    errorClient,
    setErrorClient,
  } = useContext(ContextBL);

  const newFormData = (e) => {
    let newFormData = Object.assign({}, formData);
    newFormData[e.target.name] = e.target.value;
    setFormData(newFormData);
    setErrorClient("");
  };

  const formSubmit = (e) => {
    e.preventDefault();
    let id = affichageBloc.id;
    let client = "";
    listClients.forEach((element) => {
      if (
        formData.client.split(" ")[formData.client.split(" ").length - 1] ===
        element.code
      ) {
        client = element.code;
      }
    });
    let user = "";
    listUsers.forEach((element) => {
      if (element.pseudo === formData.user) {
        user = element.pseudo;
      }
    });
    affichageBloc === ""
      ? axios
          .post(
            `http://localhost:3001/api/bl/new/`,
            {
              client: client,
              date: formData.date,
              infos: formData.infos,
              numCarnet: formData.numCarnet,
              numBL: formData.numBL,
              user: user,
            },
            {
              headers: {
                Authorization: localStorage.getItem("user"),
              },
            }
          )
          .then((res) => {
            window.location.reload();
          })
          .catch((error) => {
            if (error.response && error.response.data.authError) {
              if (localStorage.getItem("user")) {
                localStorage.removeItem("user");
              }
              window.location.reload();
            } else if (error.response && error.response.data.errorClient) {
              setErrorClient(error.response.data.errorClient);
            }
          })
      : axios
          .put(
            `http://localhost:3001/api/bl/modify/`,
            {
              id: id,
              client: client,
              date: formData.date,
              infos: formData.infos,
              numCarnet: formData.numCarnet,
              numBL: formData.numBL,
              user: user,
            },
            {
              headers: {
                Authorization: localStorage.getItem("user"),
              },
            }
          )
          .then(() => {
            window.location.reload();
          })
          .catch((error) => {
            if (error.response && error.response.data.authError) {
              if (localStorage.getItem("user")) {
                localStorage.removeItem("user");
              }
              window.location.reload();
            } else if (error.response && error.response.data.errorClient) {
              setErrorClient(error.response.data.errorClient);
            }
          });
  };

  const confirmerDelete = () => {
    const id = affichageBloc.id;
    console.log(id);
    if (window.confirm("Etes-vous sûr de vouloir supprimer le BL ?")) {
      axios
        .delete(`http://localhost:3001/api/bl/delete/`, {
          params: { id: id },
          headers: {
            Authorization: localStorage.getItem("user"),
          },
        })
        .then(() => {
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
    }
  };

  return (
    <Form onSubmit={formSubmit}>
      <Form.Row>
        <DropdownClients
          BL={affichageBloc}
          formData={formData}
          setFormData={newFormData}
        />
        <DropdownUsers
          BL={affichageBloc}
          formData={formData}
          setFormData={newFormData}
        />
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} className="text-center">
          <Form.Label>Date :</Form.Label>
          <Form.Control
            value={formData.date}
            className="border border-secondary"
            type="date"
            name="date"
            onChange={newFormData}
            required
          />
        </Form.Group>
        <Form.Group as={Col} className="text-center">
          <Form.Label>Numéro de carnet :</Form.Label>
          <Form.Control
            value={formData.numCarnet}
            className="border border-secondary"
            type="number"
            placeholder="n°"
            inputMode="numeric"
            name="numCarnet"
            onChange={newFormData}
            required
          />
        </Form.Group>
        <Form.Group as={Col} className="text-center">
          <Form.Label>Numéro de BL :</Form.Label>
          <Form.Control
            value={formData.numBL}
            className="border border-secondary"
            type="number"
            placeholder="n°"
            inputMode="numeric"
            name="numBL"
            onChange={newFormData}
            required
          />
        </Form.Group>
      </Form.Row>
      <Form.Group as={Row}>
        <Form.Label>Infos complémentaires :</Form.Label>
        <Form.Control
          value={formData.infos}
          className="border border-secondary"
          rows={3}
          as="textarea"
          placeholder="Infos complémentaires"
          name="infos"
          onChange={newFormData}
        />
      </Form.Group>
      <Form.Group
        as={Row}
        className="d-flex justify-content-center text-center"
      >
        <div className="button-create-bl">
          <Button size="lg" variant="primary" type="submit" block>
            {affichageBloc === "" ? "Créer le BL" : "Modifier le BL"}
          </Button>
          {affichageBloc === "" ? (
            ""
          ) : (
            <Button size="lg" variant="danger" onClick={confirmerDelete} block>
              Supprimer le BL
            </Button>
          )}
        </div>
      </Form.Group>
    </Form>
  );
}

export default FormBL;
