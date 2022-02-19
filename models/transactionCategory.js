const { Schema, model } = require("mongoose");
const Joi = require("joi");

const transactionCategorySchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
    },
    income: {
      type: Boolean,
      required: [true, "Type is required"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiTransactionCategorySchema = Joi.object({
  income: Joi.boolean().truthy(1, 0).required(),
  name: Joi.string().required(),
});

const TransactionCategory = model(
  "transaction_category",
  transactionCategorySchema
);

module.exports = { TransactionCategory, joiTransactionCategorySchema };
