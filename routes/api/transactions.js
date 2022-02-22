const express = require("express");

const authenticate = require("../../middlewares/authenticate");
const {
  addTransactionController,
  getTransactionsController,
  addTransactionCategoryController,
  getTransactionCategoriesController,
  getTransactionsStatisticsController,
} = require("../../controllers/transactions");

const router = express.Router();

router.post("/", authenticate, addTransactionController);
router.get("/", authenticate, getTransactionsController);
router.post("/categories", authenticate, addTransactionCategoryController);
router.get("/categories", authenticate, getTransactionCategoriesController);
router.get("/stats", authenticate, getTransactionsStatisticsController);

module.exports = router;
