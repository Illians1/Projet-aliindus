import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

function DropdownClients(props) {
  const villeData = props.villeData;

  return (
    <Form.Group as={Col} className="text-center col-12 col-xl-4">
      <Form.Label>Ville :</Form.Label>
      <Form.Control
        value={props.formData.ville}
        className="border border-secondary input-text-form"
        type="text"
        placeholder="Ville"
        list="ville"
        name="ville"
        onChange={(e) => props.setFormData(e, "ville")}
        required
      />
      <datalist id="ville">
        {villeData.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </datalist>
    </Form.Group>
  );
}

export default DropdownClients;
