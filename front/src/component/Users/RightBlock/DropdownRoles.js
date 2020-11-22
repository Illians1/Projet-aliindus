import React, { useState, useEffect, useContext } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import axios from "axios";
import ContextUsers from "../../Context/ContextUsers";

function DropdownRoles(props) {
  const [listRoles, setListRoles] = useState([]);
  const {
    affichageBloc,
  } = useContext(ContextUsers);

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
    <Form.Group as={Col} className={affichageBloc === "" ? "text-center col-12 col-xl-6" : "text-center col-12"}>
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
    </ Form.Group >
  );
}

export default DropdownRoles;
