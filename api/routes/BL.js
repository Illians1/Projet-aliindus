const express = require("express");
const router = express.Router();

const BLCtrl = require("../queries/BL");

router.get("/", BLCtrl.getAllBL);
router.get("/client", BLCtrl.getAllBLByClient);
router.post("/new/:client/:date/:infos/:numCarnet/:numBL/:user", BLCtrl.newBL);
router.post(
  "/modify/:id/:client/:date/:infos/:numCarnet/:numBL/:user",
  BLCtrl.modifyBL
);
router.post("/delete/:id", BLCtrl.deleteBL);
router.post("/:valide/:id", BLCtrl.valideOneBL);

module.exports = router;
