const { BadRequest } = require("http-errors");
const {
  joiTransactionCategorySchema,
} = require("../../models/transactionCategory");
const {
  addTransactionCategory,
} = require("../../services/transactions/transactionsService");

const addTransactionCategoryController = async (req, res, next) => {
  try {
    const { error } = joiTransactionCategorySchema.validate(req.body);

    if (error) {
      throw new BadRequest(error.message);
    }

    const { _id } = req.user;
    const newTranasactionCategory = await addTransactionCategory(_id, req.body);

    res.status(201).json(newTranasactionCategory);
  } catch (error) {
    next(error);
  }
};

module.exports = addTransactionCategoryController;
