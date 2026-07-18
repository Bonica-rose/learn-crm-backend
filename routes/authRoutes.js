const express = require("express");
const router = express.Router();

const {
    register,
    login,
    logout,
    getMe
} = require("../controllers/authController");

const protect = require("../middlewares/authenticate");
const registerValidator = require("../validators/registerValidator");
const loginValidator = require("../validators/loginValidator");
const validationCheck = require('../middlewares/validation')

router.post("/register", registerValidator, validationCheck, register);
router.post("/login", loginValidator, validationCheck, login);
router.post("/logout", protect, logout);
router.get("/me", protect, getMe);

module.exports = router;