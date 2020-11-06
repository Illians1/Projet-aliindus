import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ContextClients from "../../Context/ContextClients";
import DropdownVille from "./DropdownVille";

function FormClient() {
  const { affichageBloc, formData, setFormData } = useContext(ContextClients);
  const [villeData, setVilleData] = useState([]);

  const autoCompleteAddress = (e, type) => {
    const value = e.target.value;
    switch (type) {
      case "ville": {
        axios
          .get(
            `https://geo.api.gouv.fr/communes/?nom=${value}&limit=5&fields=nom,codesPostaux,departement`
          )
          .then((res) => {
            console.log(res.data);
            let newVille = [];
            res.data.forEach((element) => {
              newVille.push(element.nom);
            });
            setVilleData(newVille);
            return res;
          })
          .then((res) => {
            let newFormData = Object.assign({}, formData);
            if (res.data.length > 0) {
              let found;
              res.data.forEach((element) => {
                if (element.nom === value) {
                  found = 1;
                  newFormData["codePostal"] = element.codesPostaux[0];
                  newFormData["departement"] = element.departement.nom;
                }
              });
              if (found !== 1) {
                newFormData["codePostal"] = res.data[0].codesPostaux[0];
                newFormData["departement"] = res.data[0].departement.nom;
              }
            } else {
              newFormData["codePostal"] = "";
              newFormData["departement"] = "";
            }
            newFormData["ville"] = value;
            setFormData(newFormData);
          });
        break;
      }
      case "codePostal": {
        var numbers = /^[0-9]+$/;
        let newFormData = Object.assign({}, formData);
        if (value.match(numbers) && value.length === 5) {
          axios
            .get(
              `https://geo.api.gouv.fr/communes?codePostal=${value}&fields=nom,departement`
            )
            .then((res) => {
              if (res.data.length > 1) {
                let newVille = [];
                res.data.forEach((element) => {
                  newVille.push(element.nom);
                });
                setVilleData(newVille);
              } else {
                newFormData["ville"] = res.data[0].nom;
              }
              newFormData["departement"] = res.data[0].departement.nom;
              newFormData["codePostal"] = value;
              setFormData(newFormData);
            });
        } else {
          newFormData["codePostal"] = value;
          setFormData(newFormData);
        }
        break;
      }
    }
  };

  const newFormData = (e, type) => {
    if (type !== "") {
      autoCompleteAddress(e, type);
    } else {
      let newFormData = Object.assign({}, formData);
      newFormData[e.target.name] = e.target.value;
      setFormData(newFormData);
    }
  };

  const formSubmit = (e) => {
    e.preventDefault();
    let id = affichageBloc.id;
    const nom = formData.nom.toUpperCase();
    const adresse = formData.adresse.toUpperCase();
    const code = formData.code.toUpperCase();
    const ville = formData.ville.toUpperCase();
    const departement = formData.departement.toUpperCase();
    affichageBloc === ""
      ? axios
          .post(
            `http://localhost:3001/api/client/new/${nom}/${code}/${adresse}/${ville}/${formData.codePostal}/${departement}`
          )
          .then((res) => {
            console.log(res);
            console.log(res.data);
            window.location.reload();
          })
      : axios.post(`http://localhost:3001/api/bl/modify/${id}/`).then((res) => {
          console.log(res);
          console.log(res.data);
          window.location.reload();
        });
  };

  const confirmerDelete = () => {
    if (window.confirm("Etes-vous sûr de vouloir supprimer le BL ?")) {
      axios
        .post(`http://localhost:3001/api/client/delete/${affichageBloc.code}`)
        .then((res) => {
          console.log(res);
          console.log(res.data);
          window.location.reload();
        });
    }
  };

  return (
    <Form onSubmit={formSubmit}>
      <Form.Row>
        <Form.Group as={Col} className="text-center">
          <Form.Label>Nom du client :</Form.Label>
          <Form.Control
            value={formData.nom}
            className="border border-secondary"
            placeholder="Nom du client"
            type="text"
            name="nom"
            onChange={(e) => newFormData(e, "")}
            required
          />
        </Form.Group>
        <Form.Group as={Col} className="text-center">
          <Form.Label>Code client :</Form.Label>
          <Form.Control
            value={formData.code}
            className="border border-secondary"
            type="text"
            name="code"
            placeholder="Code client"
            onChange={(e) => newFormData(e, "")}
            required
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group id="autocomplete" as={Col} className="text-center">
          <Form.Label>Adresse :</Form.Label>
          <Form.Control
            value={formData.adresse}
            className="border border-secondary"
            type="text"
            name="adresse"
            placeholder="Adresse du client"
            onChange={(e) => newFormData(e, "")}
            autoComplete="nonono"
            required
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <DropdownVille
          villeData={villeData}
          formData={formData}
          setFormData={newFormData}
        />
        <Form.Group as={Col} className="text-center">
          <Form.Label>Code Postal :</Form.Label>
          <Form.Control
            value={formData.codePostal}
            className="border border-secondary"
            placeholder="Code Postal"
            type="text"
            name="codePostal"
            onChange={(e) => newFormData(e, "codePostal")}
            required
          />
        </Form.Group>
        <Form.Group as={Col} className="text-center">
          <Form.Label>Nom du département :</Form.Label>
          <Form.Control
            value={formData.departement}
            className="border border-secondary"
            type="text"
            placeholder="Nom du département"
            name="departement"
            onChange={(e) => newFormData(e, "")}
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
            {affichageBloc === "" ? "Créer le client" : "Modifier le Client"}
          </Button>
          {affichageBloc === "" ? (
            ""
          ) : (
            <Button size="lg" variant="danger" onClick={confirmerDelete} block>
              Supprimer le Client
            </Button>
          )}
        </div>
      </Form.Group>
    </Form>
  );
}

export default FormClient;
