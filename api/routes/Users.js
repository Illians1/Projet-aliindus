const express = require("express");
const router = express.Router();

const UsersCtrl = require("../queries/Users");
const auth = require("../middleware/auth");

router.get("/", auth, UsersCtrl.getAllUsers);
router.get("/role", auth, UsersCtrl.getAllRoles);
router.post("/signup/", auth, UsersCtrl.signup);
router.post("/login/", UsersCtrl.login);
router.put("/modify", auth, UsersCtrl.modifyUser);
router.delete("/delete/", auth, UsersCtrl.deleteUser);

module.exports = router;
