const express = require("express");
const router = express.Router();

const BLCtrl = require("../controllers/BL");

router.get("/", BLCtrl.getAllBL);

module.exports = router;
