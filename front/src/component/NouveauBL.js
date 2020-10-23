import React, { useState, useContext } from "react";
import "../css/App.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DropdownClients from "./DropdownClients";
import DropdownUsers from "./DropdownUsers";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ContextClientsUsers from "./ContextClientsUsers";

function NouveauBL() {
  const { listUsers, listClients } = useContext(ContextClientsUsers);

  const todayDate = () => {
    const date = new Date(Date.now());
    const newDate = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
    ].join("-");
    return newDate;
  };

  const [formData, setFormData] = useState({
    client: "",
    date: todayDate(),
    user: "admin admin",
    numCarnet: "",
    numBL: "",
    infos: " ",
  });

  const newFormData = (prop, newData) => {
    let newFormData = Object.assign({}, formData);
    newFormData[prop] = newData;
    setFormData(newFormData);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    let client = "";
    listClients.forEach((element) => {
      if (formData.client.split(" ")[0] === element.nom.split(" ")[0]) {
        client = element.code;
      }
    });
    let user = "";
    listUsers.forEach((element) => {
      if (element.nom + " " + element.prenom === formData.user) {
        user = element.id;
      }
    });
    axios
      .post(
        `http://localhost:3000/api/bl/new/${client}/${formData.date}/${formData.infos}/${formData.numCarnet}/${formData.numBL}/${user}`
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
    setFormData({
      client: "",
      date: todayDate(),
      user: "admin admin",
      numCarnet: "",
      numBL: "",
      infos: "",
    });
  };
  return (
    <div className="nouveau-bl">
      <div className="nouveau-bl-child">
        <h1>Enregistrement d'un nouveau Bon de Livraison</h1>
        <div className="form-new-bl">
          <Form onSubmit={(e) => formSubmit(e)}>
            <Form.Row>
              <DropdownClients formData={formData} setFormData={newFormData} />
              <DropdownUsers formData={formData} setFormData={newFormData} />
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} className="text-center">
                <Form.Label>Date :</Form.Label>
                <Form.Control
                  value={formData.date}
                  className="border border-secondary"
                  type="date"
                  name="date"
                  onChange={(e) => newFormData(e.target.name, e.target.value)}
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
                  onChange={(e) => newFormData(e.target.name, e.target.value)}
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
                  onChange={(e) => newFormData(e.target.name, e.target.value)}
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
                onChange={(e) => newFormData(e.target.name, e.target.value)}
              />
            </Form.Group>
            <Form.Group
              as={Row}
              className="d-flex justify-content-center text-center"
            >
              <div className="button-create-bl">
                <Button size="lg" variant="primary" type="submit" block>
                  Créer le BL
                </Button>
              </div>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default NouveauBL;
