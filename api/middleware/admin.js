const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const auth = JSON.parse(req.headers.authorization);
    const token = auth.token;
    const decodedToken = jwt.verify(
      token,
      "DYikuzdkiu_//fj^^_fbfkuqjzhjhmpoiUKFHklfkhuf_zhukgzdilqhbdkqd!fesufghsp"
    );
    const userRole = decodedToken.userRole;
    if (userRole === "admin") {
      next();
    } else {
      throw "Invalid user ID";
    }
  } catch {
    res.status(401).json({
      authError: "Erreur d'authentification",
    });
  }
};
