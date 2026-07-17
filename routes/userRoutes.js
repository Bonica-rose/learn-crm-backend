const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authenticate");
const access = require("../middlewares/authorize");

const {
    getUsers, deleteUser
} = require("../controllers/userController");

router.use(protect);

router.get("/", protect, access('Admin'), getUsers);
router.delete("/:id", protect, access('Admin'), deleteUser);

module.exports = router;