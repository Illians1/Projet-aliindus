import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import axios from "axios";

function DropdownRoles(props) {
  const [listRoles, setListRoles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const roles = await axios.get(`http://localhost:3001/api/user/role`, {
        headers: {
          Authorization: localStorage.getItem("user"),
        },
      });
      setListRoles(roles.data.results);
    };
    fetchData();
  }, []);

  return (
    <Form.Group as={Col} className="text-center col-12 col-xl-6">
      <Form.Label>Role de l'utilisateur :</Form.Label>
      <div className="select text-center">
        <Form.Control
          value={props.formData.role}
          className="border border-primary text-center"
          as="select"
          list="role"
          placeholder="Nom du role"
          name="role"
          onChange={props.setFormData}
          required
        >
          {listRoles.map((item, index) => (
            <option key={index}>{item.nom}</option>
          ))}
        </Form.Control>
      </div>
    </Form.Group>
  );
}

export default DropdownRoles;
