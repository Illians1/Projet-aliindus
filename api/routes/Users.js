const express = require("express");
const router = express.Router();

const UsersCtrl = require("../queries/Users");

router.get("/", UsersCtrl.getAllUsers);

module.exports = router;
