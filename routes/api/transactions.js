const express = require("express");

const authenticate = require("../../middlewares/authenticate");
const { add, getTransactions, getStats } = require("../../controllers/transactions");

const router = express.Router();

router.post("/", authenticate, add);
router.get("/", authenticate, getTransactions);
router.get("/:userId", authenticate, getStats);

module.exports = router;
