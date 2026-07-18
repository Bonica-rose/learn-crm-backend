const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authenticate");
const access = require("../middlewares/authorize");
const validationCheck = require('../middlewares/validation');
const customerValidator = require("../validators/customerValidator");

const {
    createCustomer,
    getCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer
} = require("../controllers/customerController");

router.use(protect);

router.post("/", access("Admin","Staff"), customerValidator, validationCheck, createCustomer);
router.get("/", access("Staff"), getCustomers);
router.get("/:id", access("Staff"), getCustomer);
router.put("/:id", access("Staff"), customerValidator, validationCheck, updateCustomer);
router.delete("/:id", access("Staff"), deleteCustomer);

module.exports = router;