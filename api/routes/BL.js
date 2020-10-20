const express = require("express");
const router = express.Router();

const BLCtrl = require("../controllers/BL");

router.get("/bl", BLCtrl.getAllBL);
router.get("/bl/client", BLCtrl.getAllBLByClient);
router.get("/client", BLCtrl.getAllClients);
router.get("/user", BLCtrl.getAllUsers);
router.post("/bl/:valide/:id", BLCtrl.valideOneBL);

module.exports = router;
