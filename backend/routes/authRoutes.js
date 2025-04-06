const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { loginUser, registerUser } = require("../controllers/authController");
const router = express.Router();
router.post("/login", loginUser);
router.post("/register", registerUser);
module.exports = router;
