const express = require("express");
const router = express.Router();

const BLCtrl = require("../controllers/BL");

router.get("/", BLCtrl.getAllBL);
router.get("/client", BLCtrl.getAllBLByClient);

module.exports = router;
