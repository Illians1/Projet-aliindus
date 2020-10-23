const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "aliindustrie",
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

exports.getAllBL = (req, res, next) => {
  connection.query(
    "SELECT bl.id, bl.date, bl.numeroCarnet, bl.numeroBl, bl.valide, clients.code AS codeClient, clients.nom AS nomClient, CONCAT( utilisateurs.prenom, utilisateurs.nom ) AS nomUtilisateur FROM bl LEFT JOIN clients ON bl.codeClient = clients.code LEFT JOIN utilisateurs ON bl.idUtilisateur = utilisateurs.id ORDER BY bl.date, bl.numeroCarnet, bl.numeroBl",
    function (error, results, fields) {
      // error will be an Error if one occurred during the query
      // results will contain the results of the query
      // fields will contain information about the returned results fields (if any)
      if (error) {
        res.status(400).json({
          error,
        });
      } else {
        results.forEach((element) => {
          const date = new Date(element.date);
          function pad(s) {
            return s < 10 ? "0" + s : s;
          }
          element.date = [
            pad(date.getDate()),
            pad(date.getMonth() + 1),
            date.getFullYear(),
          ].join("/");
        });
        res.status(200).json({
          results,
        });
      }
    }
  );
};

exports.getAllBLByClient = (req, res, next) => {
  connection.query(
    "SELECT bl.id, bl.date, bl.numeroCarnet, bl.numeroBl, bl.valide, clients.code AS codeClient, clients.nom AS nomClient, CONCAT( utilisateurs.prenom, utilisateurs.nom ) AS nomUtilisateur FROM bl LEFT JOIN clients ON bl.codeClient = clients.code LEFT JOIN utilisateurs ON bl.idUtilisateur = utilisateurs.id ORDER BY nomClient, bl.date, bl.numeroCarnet, bl.numeroBl",
    function (error, results, fields) {
      // error will be an Error if one occurred during the query
      // results will contain the results of the query
      // fields will contain information about the returned results fields (if any)
      if (error) {
        res.status(400).json({
          error,
        });
      } else {
        results.forEach((element) => {
          const date = new Date(element.date);
          function pad(s) {
            return s < 10 ? "0" + s : s;
          }
          element.date = [
            pad(date.getDate()),
            pad(date.getMonth() + 1),
            date.getFullYear(),
          ].join("/");
        });
        res.status(200).json({
          results,
        });
      }
    }
  );
};

exports.valideOneBL = (req, res, next) => {
  const id = req.params.id;
  const valide = req.params.valide;
  const sql =
    "UPDATE bl SET valide = " +
    connection.escape(valide) +
    " WHERE id = " +
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

exports.getAllUsers = (req, res, next) => {
  connection.query(
    "SELECT * FROM utilisateurs ORDER BY utilisateurs.nom",
    function (error, results, fields) {
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
    }
  );
};

exports.newBL = (req, res, next) => {
  const client = req.params.client;
  const date = req.params.date;
  const user = req.params.user;
  const numCarnet = req.params.numCarnet;
  const numBL = req.params.numBL;
  const infos = req.params.infos;
  const sql =
    "INSERT INTO bl (codeClient, date, idUtilisateur, numeroCarnet, numeroBL, info, valide) VALUES (" +
    connection.escape(client) +
    "," +
    connection.escape(date) +
    "," +
    connection.escape(user) +
    "," +
    connection.escape(numCarnet) +
    "," +
    connection.escape(numBL) +
    "," +
    connection.escape(infos) +
    ", 'non')";
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
