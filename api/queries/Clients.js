const connection = require("../dbConfig/ConnectionMySQL");

exports.getAllClients = (req, res, next) => {
  connection.query("SELECT * FROM clients ORDER BY clients.nom", function (
    error,
    results,
    fields
  ) {
    // error will be an Error if one occurred during the query
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
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
  const nom = req.params.nom;
  const code = req.params.code;
  const adresse = req.params.adresse;
  const ville = req.params.ville;
  const codePostal = req.params.codePostal;
  const departement = req.params.departement;
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
        error,
        sql,
      });
    } else {
      res.status(201).json({
        message: sql,
      });
    }
  });
};

exports.deleteClient = (req, res, next) => {
  const id = req.params.id;
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
      res.status(201).json({
        message: sql,
      });
    }
  });
};
