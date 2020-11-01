import React, { useContext } from "react";
import "../css/App.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import ContextClientsUsers from "./ContextClientsUsers";

function DropdownClients(props) {
  const { listClients } = useContext(ContextClientsUsers);

  return (
    <Form.Group as={Col} className="text-center">
      <Form.Label>Nom du client :</Form.Label>
      <Form.Control
        value={props.formData.client}
        className="border border-primary"
        type="text"
        placeholder="Nom du client"
        list="client"
        name="client"
        onChange={props.setFormData}
        required
      />
      <datalist id="client">
        {listClients.map((item, index) => (
          <option key={index}>{item.nom + " - " + item.code}</option>
        ))}
      </datalist>
      <div>
        <div className="d-flex justify-content-center">
          <a href="google.com">Créer un nouveau client</a>
        </div>
      </div>
    </Form.Group>
  );
}

export default DropdownClients;