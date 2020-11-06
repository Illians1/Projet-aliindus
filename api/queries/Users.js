const connection = require("../dbConfig/ConnectionMySQL");

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
