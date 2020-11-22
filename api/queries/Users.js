const connection = require("../dbConfig/ConnectionMySQL");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

exports.signup = (req, res, next) => {
  const nom = req.body.nom;
  const prenom = req.body.prenom;
  const login = req.body.login;
  const sqlCheck =
    "SELECT * FROM utilisateurs WHERE pseudo =" + connection.escape(login);
  connection.query(sqlCheck, function (error, results, fields) {
    // error will be an Error if one occurred during the query
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
    if (error) {
      res.status(400).json({
        error,
      });
    } else {
      if (results.length > 0) {
        res.status(403).json({
          errorAccount: "Pseudo déja existant !",
        });
      } else {
        const password1 = req.body.password1;
        const password2 = req.body.password2;
        const role = req.body.role;
        if (password1 !== password2) {
          res.status(403).json({
            errorPassword: "Les deux mots de passe ne correspondent pas !",
          });
        } else {
          bcrypt.hash(password1, 10, (err, hash) => {
            const password = hash;
            const sqlQuerie =
              "INSERT INTO utilisateurs (nom, prenom, pseudo, mot_de_passe, role) VALUES (" +
              connection.escape(nom) +
              "," +
              connection.escape(prenom) +
              "," +
              connection.escape(login) +
              "," +
              connection.escape(password) +
              "," +
              connection.escape(role) +
              ")";
            connection.query(sqlQuerie, function (error, results, fields) {
              // error will be an Error if one occurred during the query
              // results will contain the results of the query
              // fields will contain information about the returned results fields (if any)
              if (error) {
                res.status(400).json({
                  error,
                });
              } else {
                res.status(200).json({
                  message: sqlQuerie,
                });
              }
            });
          });
        }
      }
    }
  });
};

exports.login = (req, res, next) => {
  const login = req.body.login;
  const password = req.body.password;
  const sqlCheck =
    "SELECT * FROM utilisateurs WHERE pseudo =" + connection.escape(login);
  connection.query(sqlCheck, function (error, results, fields) {
    // error will be an Error if one occurred during the query
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
    if (error) {
      console.log(sqlCheck);
      res.status(400).json({
        error,
      });
    } else {
      if (results.length < 1) {
        res.status(401).json({
          errorLogin: "Utilisateur non trouvé !",
        });
      } else {
        bcrypt
          .compare(password, results[0].mot_de_passe)
          .then((valid) => {
            if (!valid) {
              return res
                .status(401)
                .json({ errorPassword: "Mot de passe incorrect !" });
            }
            return res.status(200).json({
              userRole: results[0].role,
              token: jwt.sign(
                { userRole: results[0].role },
                "DYikuzdkiu_//fj^^_fbfkuqjzhjhmpoiUKFHklfkhuf_zhukgzdilqhbdkqd!fesufghsp",
                { expiresIn: 1800 }
              ),
            });
          })
          .catch((error) => res.status(500).json({ error }));
      }
    }
  });
};

exports.getAllRoles = (req, res, next) => {
  connection.query("SELECT * FROM roles ORDER BY roles.nom DESC", function (
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

exports.modifyUser = (req, res, next) => {
  const id = req.body.id;
  const nom = req.body.nom;
  const prenom = req.body.prenom;
  const password1 = req.body.password1;
  const password2 = req.body.password2;
  const role = req.body.role;
  if (password1 !== password2) {
    res.status(403).json({
      errorMessage: "Les deux mots de passe ne correspondent pas !",
    });
  } else {
    bcrypt.hash(password1, 10, (err, hash) => {
      const password = hash;
      const sql =
        "UPDATE utilisateurs SET nom =" +
        connection.escape(nom) +
        ", prenom =" +
        connection.escape(prenom) +
        ", mot_de_passe = " +
        connection.escape(password) +
        ", role = " +
        connection.escape(role) +
        " WHERE pseudo = " +
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
          res.status(200).json({
            message: sql,
          });
        }
      });
    });
  }
};

exports.deleteUser = (req, res, next) => {
  const id = req.query.id;
  const sql = "DELETE FROM utilisateurs WHERE pseudo =" + connection.escape(id);
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
