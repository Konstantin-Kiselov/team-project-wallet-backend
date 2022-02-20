const { Transaction } = require("../../models");

const getStatsController = async (req, res, next) => {
  try {
    // console.log(req.params);
    // const { _id } = req.params;

  // const getStats = async ( _id, query) => {
  //   try {
  //     if (!query?.year || !query?.income) {
  //       return null;
  //     }

  // const getSortedCategories = users => {
//   return users.filter((skill, index, array) => array.indexOf(skill) === index)
//   .sort();
// };
      const {_id} = req.user
      let statsArr = [];
      const transactionsByOwner = await Transaction.find({owner: _id});
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

  //         if (category.id === query.category.id && month >= startDate && month <= endDate) {
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