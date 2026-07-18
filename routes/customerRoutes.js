const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authenticate");
const access = require("../middlewares/authorize");

const {
    createCustomer,
    getCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer
} = require("../controllers/customerController");

router.use(protect);

router.post("/", access("Admin","Staff"), createCustomer);
router.get("/", access("Staff"), getCustomers);
router.get("/:id", access("Staff"), getCustomer);
router.put("/:id", access("Staff"), updateCustomer);
router.delete("/:id", access("Staff"), deleteCustomer);

module.exports = router;