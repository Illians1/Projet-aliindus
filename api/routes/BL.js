const express = require("express");
const router = express.Router();

const BLCtrl = require("../queries/BL");
const auth = require("../middleware/auth");

router.get("/", auth, BLCtrl.getAllBL);
router.get("/client", auth, BLCtrl.getAllBLByClient);
router.post("/new/", auth, BLCtrl.newBL);
router.put("/modify/", auth, BLCtrl.modifyBL);
router.delete("/delete/", auth, BLCtrl.deleteBL);
router.put("/valid", auth, BLCtrl.valideOneBL);

module.exports = router;
