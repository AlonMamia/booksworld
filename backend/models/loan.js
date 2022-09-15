const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { User } = require("./user");
const mongoose = require("mongoose");

mongoose.connect('')

const loan_schema = mongoose.Schema({
  user: { type: String },
  book: { type: String },
  startDate: { type: Date, default: new Date() },
  endDate: { type: Date },
});

const Loan = new mongoose.Model("loans", loan_schema);

const validate_loan = (user, book) => {
  const schema = new Joi.object({
    user: Joi.object({
      _id: Joi.objectId(),
      email: Joi.string(),
    }),
    book: Joi.object({
      _id: Joi.objectId(),
      name: Joi.string(),
    }),
    startDate: Joi.date(),
    endDate: Joi.date(),
  });
  return schema.validate({
    user: user,
    book: book,
    startDate: startDate,
    endDate: endDate,
  });
};

module.exports = { validate_loan, Loan };
