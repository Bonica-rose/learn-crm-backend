const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authenticate");
const access = require("../middlewares/authorize");

const {
    getAllCustomers,
    getCustomerForAdmin,
    updateCustomerForAdmin,
    deleteCustomerForAdmin
} = require("../controllers/customerController");

router.use(protect);

router.get("/", access("Admin"), getAllCustomers);
router.get("/:id", access("Admin"), getCustomerForAdmin);
router.put("/:id", access("Admin"), updateCustomerForAdmin);
router.delete("/:id", access("Admin"), deleteCustomerForAdmin);

module.exports = router;