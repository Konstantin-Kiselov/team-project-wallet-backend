const { BadRequest } = require("http-errors");
const { joiTransactionSchema } = require("../../models/transaction");
const {
  addTransaction,
} = require("../../services/transactions/transactionsService");

const addTransactionController = async (req, res, next) => {
  try {
    const { error } = joiTransactionSchema.validate(req.body);

    if (error) {
      throw new BadRequest(error.message);
    }

    const { _id, balance } = req.user;
    const newTransaction = await addTransaction(_id, balance, req.body);

    res.status(201).json(newTransaction);
  } catch (error) {
    next(error);
  }
};

module.exports = addTransactionController;
