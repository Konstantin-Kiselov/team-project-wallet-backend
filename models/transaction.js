const { Schema, model } = require("mongoose");
const Joi = require("joi");

const transactionSchema = Schema(
  {
    income: {
      type: Boolean,
      required: [true, "Type is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    comment: {
      type: String,
      default: "",
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    total: {
      type: Number,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const joiTransactionSchema = Joi.object({
  income: Joi.boolean().truthy(1, 0).required(),
  category: Joi.string().required(),
  comment: Joi.string(),
  amount: Joi.number().required(),
});

const Transaction = model("transaction", transactionSchema);

module.exports = { Transaction, joiTransactionSchema };
