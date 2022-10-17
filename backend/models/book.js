const Joi = require("joi");
const mongoose = require("mongoose");
const mongooseIncrement = require("mongoose-increment");
const increment = mongooseIncrement(mongoose);
require("dotenv").config();

mongoose.connect(process.env.DB_URL).then(() => console.log("connect success"));

const book_schema = mongoose.Schema({
  name: String,
  author: String,
  year: Number,
  photo: String,
  description: String,
  rating: Number,
  InStock: Number,
  price: Number,
});

book_schema.plugin(increment, {
  modelName: "books",
  fieldName: "Count",
});

const Book = new mongoose.model("books", book_schema);

function validate_book(book) {
  const schema = new Joi.object({
    name: Joi.string()
      .min(4)
      .regex(/^[a-z ,.'-]+$/i),
    author: Joi.string()
      .min(4)
      .regex(/^[a-z ,.'-]+$/i),
    year: Joi.number(),
    photo: Joi.string(),
  });
  return schema.validate({
    name: book.name,
    author: book.author,
    year: book.year,
    photo: book.photo,
  });
}

module.exports = { Book };
