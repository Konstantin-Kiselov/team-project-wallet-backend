const { BadRequest } = require("http-errors");
const { User, Transaction } = require("../../models/");

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
  const transactions = await Transaction.find(
    {
      owner: userId,
      //   createdAt: {
      //     $gte: new Date(2022, 1, 1),
      //     $lt: new Date(2022, 1, 16),
      //   },
    },
    "-updatedAt"
  );
  return transactions;
};

module.exports = {
  addTransaction,
  getUserTransactions,
};
