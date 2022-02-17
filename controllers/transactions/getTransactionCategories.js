const {
  getTransactionCategories,
} = require("../../services/transactions/transactionsService");

const getTransactionCategoriesController = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const transactionCategories = await getTransactionCategories(_id);
    res.json(transactionCategories);
  } catch (error) {
    next(error);
  }
};

module.exports = getTransactionCategoriesController;
