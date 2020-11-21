const express = require("express");
const router = express.Router();

const UsersCtrl = require("../queries/Users");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", auth, UsersCtrl.getAllUsers);
router.get("/role", auth, UsersCtrl.getAllRoles);
router.post("/signup/", admin, UsersCtrl.signup);
router.post("/login/", UsersCtrl.login);
router.put("/modify", admin, UsersCtrl.modifyUser);
router.delete("/delete/", admin, UsersCtrl.deleteUser);

module.exports = router;
