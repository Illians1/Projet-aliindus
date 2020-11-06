const express = require("express");
const router = express.Router();

const ClientsCtrl = require("../queries/Clients");

router.get("/", ClientsCtrl.getAllClients);
router.post(
  "/new/:nom/:code/:adresse/:ville/:codePostal/:departement",
  ClientsCtrl.newClient
);
router.post("/delete/:id", ClientsCtrl.deleteClient);

module.exports = router;
