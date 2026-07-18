const express = require("express");

const {
    getDashboard
} = require("../controllers/dashboardController");

const protect = require("../middlewares/authenticate");
const access = require("../middlewares/authorize");

const router = express.Router();

router.get('/', protect, access("Admin","Staff"), getDashboard);

module.exports = router;