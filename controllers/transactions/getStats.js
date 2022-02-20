const { Transaction } = require("../../models");

const getStatsController = async (req, res, next) => {
  try {
    const { _id } = req.params;

  // const getStats = async ( _id, query) => {
  //   try {
  //     if (!query?.year || !query?.income) {
  //       return null;
  //     }

  // const getSortedCategories = users => {
//   return users.filter((skill, index, array) => array.indexOf(skill) === index)
//   .sort();
// };

      let statsArr = [];
      const transactionsByOwner = await Transaction.find(_id);
      let total = 0;
      res.json(transactionsByOwner);

  //     const result = transactionsByOwner.reduce(
  //       (acc, transaction) => {
  //         const { category, amount, date } = transaction;

  //     const getMonthByDate = (date) => {
  //       const newDate = new Date(date);
  //       return newDate.getMonth();
  //     };
  
  //     const month = getMonthByDate(date);

  //         if (category === query.category && month >= startDate && month <= endDate) {
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