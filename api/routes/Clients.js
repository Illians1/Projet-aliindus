const express = require("express");
const router = express.Router();

const ClientsCtrl = require("../queries/Clients");
const auth = require("../middleware/auth");

router.get("/", auth, ClientsCtrl.getAllClients);
router.post("/new/", auth, ClientsCtrl.newClient);
router.delete("/delete/", auth, ClientsCtrl.deleteClient);
router.put("/modify", auth, ClientsCtrl.modifyClient);

module.exports = router;
