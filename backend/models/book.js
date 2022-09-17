const Joi = require("joi");
const mongoose = require("mongoose");
var mongooseIncrement = require("mongoose-increment");

mongoose
  .connect("mongodb://localhost/BooksWorld")
  .then(() => console.log("connect success"));

const book_schema = mongoose.Schema({
  name: String,
  author: String,
  year: Number,
  photo: String,
  description: String,
  tags: [String],
  rating: Number,
  InStock: Number,
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
