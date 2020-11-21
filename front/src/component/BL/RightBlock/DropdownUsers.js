import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import ContextBL from "../../Context/ContextBL";

function DropdownUsers(props) {
  const { listUsers } = useContext(ContextBL);

  return (
    <Form.Group as={Col} className="text-center col-12 col-xl-6">
      <Form.Label>Nom du créateur du BL :</Form.Label>
      <div className="select">
        <Form.Control
          value={props.formData.user}
          className="border border-primary"
          as="select"
          placeholder="Nom de l'utilisateur"
          list="user"
          name="user"
          onChange={props.setFormData}
          required
        >
          {listUsers.map((item, index) => (
            <option key={index}>{item.pseudo}</option>
          ))}
        </Form.Control>
      </div>
    </Form.Group>
  );
}

export default DropdownUsers;
