const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authenticate");
const access = require("../middlewares/authorize");
const validationCheck = require('../middlewares/validation');
const customerValidator = require("../validators/customerValidator");

const {
    getAllCustomers,
    getCustomerForAdmin,
    updateCustomerForAdmin,
    deleteCustomerForAdmin
} = require("../controllers/customerController");

router.use(protect);

router.get("/", access("Admin"), getAllCustomers);
router.get("/:id", access("Admin"), getCustomerForAdmin);
router.put("/:id", access("Admin"), customerValidator, validationCheck, updateCustomerForAdmin);
router.delete("/:id", access("Admin"), deleteCustomerForAdmin);

module.exports = router;