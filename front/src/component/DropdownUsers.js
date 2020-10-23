import React, { useContext } from "react";
import "../css/App.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import ContextClientsUsers from "./ContextClientsUsers";

function DropdownUsers(props) {
  const { listUsers } = useContext(ContextClientsUsers);

  return (
    <Form.Group as={Col} className="text-center">
      <Form.Label>Nom du créateur du BL :</Form.Label>
      <div className="select">
        <Form.Control
          value={props.formData.user}
          className="border border-primary"
          as="select"
          placeholder="Nom de l'utilisateur"
          list="user"
          name="user"
          onChange={(e) => props.setFormData(e.target.name, e.target.value)}
          required
        >
          {listUsers.map((item, index) => (
            <option key={index}>{item.nom + " " + item.prenom}</option>
          ))}
        </Form.Control>
      </div>
    </Form.Group>
  );
}

export default DropdownUsers;
