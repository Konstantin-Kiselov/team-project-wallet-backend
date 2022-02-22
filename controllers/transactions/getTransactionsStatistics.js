const {
  getTransactionsStatistics,
} = require("../../services/transactions/transactionsService");

const getTransactionsStatisticsController = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const now = new Date();
    const { year = now.getFullYear(), month = now.getMonth() } = req.query;

    const transactions = await getTransactionsStatistics(_id, year, month);
    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

module.exports = getTransactionsStatisticsController;
