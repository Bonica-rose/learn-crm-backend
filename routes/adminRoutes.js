const express = require("express");

const {
    getAdminDashboard
} = require("../controllers/adminController");

const protect = require("../middlewares/authenticate");
const access = require("../middlewares/authorize");

const router = express.Router();

router.get('/admin', protect, access("Admin"), getAdminDashboard);

module.exports = router;