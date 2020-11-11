const connection = require("../dbConfig/ConnectionMySQL");

exports.getAllBL = (req, res, next) => {
  connection.query(
    "SELECT bl.id, bl.date, bl.numeroCarnet, bl.numeroBl, bl.valide, bl.info, clients.code AS codeClient, clients.nom AS nomClient, utilisateurs.pseudo FROM bl LEFT JOIN clients ON bl.codeClient = clients.code LEFT JOIN utilisateurs ON bl.pseudoUtilisateur = utilisateurs.pseudo ORDER BY bl.date, bl.numeroCarnet, bl.numeroBl",
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
    "SELECT bl.id, bl.date, bl.numeroCarnet, bl.numeroBl, bl.valide, bl.info, clients.code AS codeClient, clients.nom AS nomClient, utilisateurs.pseudo FROM bl LEFT JOIN clients ON bl.codeClient = clients.code LEFT JOIN utilisateurs ON bl.idUtilisateur = utilisateurs.id ORDER BY nomClient, bl.date, bl.numeroCarnet, bl.numeroBl",
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
  const id = req.body.id;
  const valide = req.body.valide;
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

exports.newBL = (req, res, next) => {
  const client = req.body.client;
  const date = req.body.date;
  const user = req.body.user;
  const numCarnet = req.body.numCarnet;
  const numBL = req.body.numBL;
  const infos = req.body.infos;
  const checkCarnet =
    "SELECT * FROM carnet WHERE numero =" + connection.escape(numCarnet);
  connection.query(checkCarnet, function (error, results, fields) {
    // error will be an Error if one occurred during the query
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
    if (error) {
      res.status(400).json({
        error,
      });
    } else {
      if (results < 1) {
        const createCarnet =
          "INSERT INTO carnet VALUES (" + connection.escape(numCarnet) + ")";
        connection.query(createCarnet, function (error, results, fields) {
          // error will be an Error if one occurred during the query
          // results will contain the results of the query
          // fields will contain information about the returned results fields (if any)
          if (error) {
            res.status(400).json({
              error,
            });
          }
        });
      }
      const sql =
        "INSERT INTO bl (codeClient, date, pseudoUtilisateur, numeroCarnet, numeroBL, info, valide) VALUES (" +
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
            errorClient: "Le client n'existe pas !",
          });
        } else {
          res.status(201).json({
            message: sql,
          });
        }
      });
    }
  });
};

exports.deleteBL = (req, res, next) => {
  const id = req.query.id;
  const sql = "DELETE FROM bl WHERE id = " + connection.escape(id);
  connection.query(sql, function (error, results, fields) {
    // error will be an Error if one occurred during the query
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
    console.log(sql);
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

exports.modifyBL = (req, res, next) => {
  const client = req.body.client;
  const date = req.body.date;
  const user = req.body.user;
  const numCarnet = req.body.numCarnet;
  const numBL = req.body.numBL;
  const infos = req.body.infos;
  const id = req.body.id;
  const checkCarnet =
    "SELECT * FROM carnet WHERE numero =" + connection.escape(numCarnet);
  connection.query(checkCarnet, function (error, results, fields) {
    // error will be an Error if one occurred during the query
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
    if (error) {
      res.status(400).json({
        error,
      });
    } else {
      if (results.length < 1) {
        const createCarnet =
          "INSERT INTO carnet VALUES (" + connection.escape(numCarnet) + ")";
        connection.query(createCarnet, function (error, results, fields) {
          // error will be an Error if one occurred during the query
          // results will contain the results of the query
          // fields will contain information about the returned results fields (if any)
          if (error) {
            res.status(400).json({
              error,
            });
          }
        });
      }
    }
    const sql =
      "UPDATE bl SET codeClient =" +
      connection.escape(client) +
      ", date =" +
      connection.escape(date) +
      ", pseudoUtilisateur = " +
      connection.escape(user) +
      ", numeroCarnet = " +
      connection.escape(numCarnet) +
      ", numeroBL = " +
      connection.escape(numBL) +
      ", info = " +
      connection.escape(infos) +
      " WHERE id = " +
      connection.escape(id);
    connection.query(sql, function (error, results, fields) {
      // error will be an Error if one occurred during the query
      // results will contain the results of the query
      // fields will contain information about the returned results fields (if any)
      console.log(sql);
      if (error) {
        res.status(400).json({
          errorClient: "Le client n'existe pas !",
        });
      } else {
        res.status(201).json({
          message: sql,
        });
      }
    });
  });
};
