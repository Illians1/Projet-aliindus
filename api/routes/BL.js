const express = require("express");
const router = express.Router();

const BLCtrl = require("../controllers/BL");

router.get("/bl", BLCtrl.getAllBL);
router.get("/bl/client", BLCtrl.getAllBLByClient);
router.get("/client", BLCtrl.getAllClients);
router.get("/user", BLCtrl.getAllUsers);
router.post(
  "/bl/new/:client/:date/:infos/:numCarnet/:numBL/:user",
  BLCtrl.newBL
);
router.post(
  "/bl/modify/:id/:client/:date/:infos/:numCarnet/:numBL/:user",
  BLCtrl.modifyBL
);
router.post("/bl/delete/:id", BLCtrl.deleteBL);
router.post("/bl/:valide/:id", BLCtrl.valideOneBL);

module.exports = router;
