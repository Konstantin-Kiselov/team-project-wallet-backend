const express = require("express");

const authenticate = require("../../middlewares/authenticate");
const { add, getTransactions } = require("../../controllers/transactions");

const router = express.Router();

router.post("/", authenticate, add);
router.get("/", authenticate, getTransactions);

module.exports = router;
