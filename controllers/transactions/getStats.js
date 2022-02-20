const { getUserTransactions } = require("../../services/transactions/transactionsService");

const getStatsController = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const transactions = await getUserTransactions(_id);
    res.json(transactions);
  // const getStats = async ( userId, query) => {
  //   try {
  //     if (!query?.year || !query?.income) {
  //       return null;
  //     }

  // const getSortedCategories = users => {
//   return users.filter((skill, index, array) => array.indexOf(skill) === index)
//   .sort();
// };
  
  //     let statsArr = [];
  //     const transactionsByOwner = await Transaction.find({ owner: userId });
  //     let total = 0;
  
  //     const result = transactionsByOwner.reduce(
  //       (acc, transaction) => {
  //         const { income, amount, date } = transaction;

  //     const getMonthByDate = (date) => {
  //       const newDate = new Date(date);
  //       return newDate.getMonth();
  //     };
  
  //     const month = getMonthByDate(date);

  //         if (income === query.income && month >= startDate && month <= endDate) {
  //           statsArr[month].total += amount;
  //           total += amount;
  //         }
  
  //         return [...acc];
  //       },
  //       [...summary]
  //     );
  //     return { result, total };
    } catch (error) {
      next(error);
    }
  // };
};

  module.exports = getStatsController;