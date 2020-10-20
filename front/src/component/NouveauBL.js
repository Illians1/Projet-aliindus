import React, { useContext } from "react";
import "../css/App.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ContextClientsUsers from "./ContextClientsUsers";

function NouveauBL() {
  const { listClients, listUsers } = useContext(ContextClientsUsers);

  return (
    <div className="nouveau-bl">
      <h1>Enregistrement d'un nouveau Bon de Livraison</h1>
      <Form>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Nom du créateur :
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="email" placeholder="Email" />
          </Col>
        </Form.Group>
        <input type="text" list="client" />
        <datalist id="client">
          {listClients.map((item, index) => (
            <option key={index}>{item.nom}</option>
          ))}
        </datalist>
        <input type="text" list="user" />
        <datalist id="user">
          {listUsers.map((item, index) => (
            <option key={index}>{item.nom}</option>
          ))}
        </datalist>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Nom du client :
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="email" placeholder="Email" />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Date :
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="email" placeholder="Email" />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Numéro de carnet :
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="email" placeholder="Email" />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Numéro de BL :
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="email" placeholder="Email" />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Infos complémentaires :
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="email" placeholder="Email" />
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}

export default NouveauBL;
