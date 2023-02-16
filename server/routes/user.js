const express = require("express");

const { Register, Login } = require("../controllers/userController");

const router = express.Router();

router.route("/register").post(Register);
router.post("/login", Login);

module.exports = router;
