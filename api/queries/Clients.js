const connection = require("../dbConfig/ConnectionMySQL");

exports.getAllClients = (req, res, next) => {
  connection.query("SELECT * FROM clients ORDER BY clients.nom", function (
    error,
    results,
    fields
  ) {
    if (error) {
      res.status(400).json({
        error,
      });
    } else {
      res.status(200).json({
        results,
      });
    }
  });
};

exports.newClient = (req, res, next) => {
  const nom = req.body.nom;
  const code = req.body.code;
  const adresse = req.body.adresse;
  const ville = req.body.ville;
  const codePostal = req.body.codePostal;
  const departement = req.body.departement;
  const sql =
    "INSERT INTO clients (nom, code, adresse, complement_adresse, ville, code_postal, nom_departement) VALUES (" +
    connection.escape(nom) +
    "," +
    connection.escape(code) +
    "," +
    connection.escape(adresse) +
    ", ' '," +
    connection.escape(ville) +
    "," +
    connection.escape(codePostal) +
    "," +
    connection.escape(departement) +
    ")";
  connection.query(sql, function (error, results, fields) {
    // error will be an Error if one occurred during the query
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
    if (error) {
      res.status(400).json({
        errorCode: "Code client déja existant !",
      });
    } else {
      res.status(201).json({
        message: sql,
      });
    }
  });
};

exports.deleteClient = (req, res, next) => {
  const id = req.query.id;
  const sql = "DELETE FROM clients WHERE code =" + connection.escape(id);
  connection.query(sql, function (error, results, fields) {
    // error will be an Error if one occurred during the query
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
    if (error) {
      res.status(400).json({
        error,
      });
    } else {
      res.status(200).json({
        message: sql,
      });
    }
  });
};

exports.modifyClient = (req, res, next) => {
  const id = req.body.id;
  const nom = req.body.nom;
  const adresse = req.body.adresse;
  const ville = req.body.ville;
  const codePostal = req.body.codePostal;
  const departement = req.body.departement;
  const sql =
    "UPDATE clients SET nom =" +
    connection.escape(nom) +
    ", adresse = " +
    connection.escape(adresse) +
    ", code_postal = " +
    connection.escape(codePostal) +
    ", ville = " +
    connection.escape(ville) +
    ", nom_departement = " +
    connection.escape(departement) +
    " WHERE code = " +
    connection.escape(id);
  connection.query(sql, function (error, results, fields) {
    // error will be an Error if one occurred during the query
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
    if (error) {
      res.status(400).json({
        error,
      });
    } else {
      res.status(201).json({
        message: sql,
      });
    }
  });
};
