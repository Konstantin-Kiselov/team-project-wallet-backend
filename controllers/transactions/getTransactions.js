const {
  getUserTransactions,
} = require("../../services/transactions/transactionsService");

const getTransactionsController = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const transactions = await getUserTransactions(_id);
    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

module.exports = getTransactionsController;
