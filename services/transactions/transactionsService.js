const { BadRequest } = require("http-errors");
const { User, Transaction, TransactionCategory } = require("../../models/");

const addTransaction = async (userId, balance, transaction) => {
  const { amount, income } = transaction;
  const newBalance = income ? balance + amount : balance - amount;
  if (newBalance < 0) {
    throw new BadRequest("Balance can not be negative");
  }

  await User.findByIdAndUpdate(userId, {
    balance: newBalance,
  });

  const newTransaction = await Transaction.create({
    ...transaction,
    owner: userId,
    total: newBalance,
  });
  return newTransaction;
};

const getUserTransactions = async (userId) => {
  const transactions = await Transaction.aggregate([
    {
      $match: {
        owner: userId,
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    { $unwind: "$category" },
    {
      $set: {
        date: { $dateToString: { date: "$createdAt", format: "%d.%m.%Y" } },
      },
    },
    { $sort: { createdAt: -1 } },
    { $unset: ["createdAt", "updatedAt"] },
  ]);

  return transactions;
};

const getTransactionsStatistics = async (userId, year, month) => {
  const result = await Transaction.aggregate([
    {
      $match: {
        owner: userId,
        createdAt: {
          $gte: new Date(year, month),
          $lt: new Date(year, Number(month) + 1),
        },
      },
    },
    {
      $facet: {
        stats: [
          { $match: { income: false } },
          {
            $lookup: {
              from: "categories",
              localField: "category",
              foreignField: "_id",
              as: "category",
            },
          },
          {
            $group: {
              _id: "$category",
              amount: { $sum: "$amount" },
            },
          },
          {
            $sort: { amount: -1 },
          },
          {
            $project: {
              _id: 0,
              name: { $first: "$_id.name" },
              amount: "$amount",
            },
          },
        ],
        income: [
          { $match: { income: true } },
          {
            $group: {
              _id: null,
              total: { $sum: "$amount" },
            },
          },
          { $unset: "_id" },
        ],
        expense: [
          { $match: { income: false } },
          {
            $group: {
              _id: null,
              total: { $sum: "$amount" },
            },
          },
          { $unset: "_id" },
        ],
      },
    },
    {
      $project: {
        stats: "$stats",
        expense: { $first: "$expense.total" },
        income: { $first: "$income.total" },
      },
    },
  ]);

  return result[0];
};

const addTransactionCategory = async (userId, category) => {
  const newTransactionCategory = await TransactionCategory.create({
    ...category,
    owner: userId,
  });
  return newTransactionCategory;
};

const getTransactionCategories = async (userId) => {
  const categories = TransactionCategory.aggregate([
    {
      $match: {
        owner: { $in: [userId, null] },
      },
    },
  ]);

  return categories;
};

module.exports = {
  addTransaction,
  getUserTransactions,
  getTransactionsStatistics,
  addTransactionCategory,
  getTransactionCategories,
};
