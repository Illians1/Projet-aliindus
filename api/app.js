const express = require("express");
const router = express.Router();

const app = express();
const bodyParser = require("body-parser");
const BLRoutes = require("./routes/BL");
const ClientsRoutes = require("./routes/Clients");
const UsersRoutes = require("./routes/Users");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.use("/api/bl", BLRoutes);
app.use("/api/client", ClientsRoutes);
app.use("/api/user", UsersRoutes);

module.exports = app;
