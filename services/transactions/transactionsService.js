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
  const transactions = await Transaction.find({
    owner: userId,
  })
    .populate({ path: "category", model: TransactionCategory })
    .sort({ createdAt: "desc" });

  const options = { day: "numeric", month: "numeric", year: "2-digit" };
  const response = transactions.map(
    ({ _id, income, category, comment, amount, total, owner, createdAt }) => {
      return {
        _id,
        income,
        category,
        comment,
        amount,
        total,
        owner,
        date: createdAt.toLocaleDateString("ru-RU", options),
      };
    }
  );

  return response;
};

const getTransactionsStatistics = async (userId, year, month) => {
  const transactions = await Transaction.find(
    {
      owner: userId,
      createdAt: {
        $gte: new Date(year, month),
        $lt: new Date(year, month + 1),
      },
    },
    "-updatedAt"
  )
    .populate({ path: "category", model: TransactionCategory })
    .sort({ createdAt: "desc" });

  const getExpenseCategories = (transactions) => {
    return transactions
      .filter((transaction) => !transaction.income)
      .flatMap((transaction) => transaction.category?.name)
      .filter((category, index, array) => array.indexOf(category) === index);
  };

  const stats = getExpenseCategories(transactions).map((cat) => {
    const totals = transactions
      .filter((transaction) => transaction.category?.name === cat)
      .reduce((acc, item) => item.amount + acc, 0);

    return { [cat]: totals };
  });

  const totalIncome = transactions
    .filter((transaction) => transaction.income)
    .reduce((acc, item) => item.amount + acc, 0);

  const totalExpense = transactions
    .filter((transaction) => !transaction.income)
    .reduce((acc, item) => item.amount + acc, 0);

  return { stats, income: totalIncome, expense: totalExpense };
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
