const express = require("express");
const route = express.Router();
const { Book } = require("../models/book");
const upload = require("../middleware/upload");
const fs = require("fs");
const path = require("path");

// route.post("/:id", (req, res) => {
//   const id = req.params.id;
// });

route.post("/", async (req, res) => {
  // let book = Book.find({});
  // console.log("hi");
  return res.send("hi");
});

route.post("/create", upload.single("photo"), async (req, res) => {
  // console.log(req.file);
  // let img = fs.readFileSync(req.file.path, "base64");
  // // let encode_img = img.toString("base64");
  // // let buffer = Buffer.from(encode_img, "base64");
  let newone = new Book({
    name: req.body.name,
    author: req.body.author,
    description: req.body.description,
    rating: req.body.rating,
    InStock: req.body.InStock,
    tags: req.body.tags,
  });
  if (req.file) {
    newone.photo = req.file.path;
  }
  const result = await newone
    .save()
    .then(() => {
      console.log("added successfully");
    })
    .catch((e) => console.log(e.message));
  return res.send(result);
});

route.post("/upload_pic", upload.single("profile_pic"), async (req, res) => {
  console.log(req.file);
  return res.send(req.file);
});

route.get("/all", async (req, res) => {
  let allbooks = await Book.find({});
  return res.send(allbooks);
});

route.post("/get_books_by_name", async (req, res) => {
  let books_by_name = await Book.find({
    // name: { $regex: req.body.name, $opinions: "i" },
    name: req.body.name,
    // author: { $regex: req.body.author, $opinions: "i" },
  });
  return res.send(books_by_name);
});

route.post("/get_books_by_author", async (req, res) => {
  let books_by_name = await Book.find({
    // name: { $regex: req.body.name, $opinions: "i" },
    author: req.body.author,
    // author: { $regex: req.body.author, $opinions: "i" },
  });
  return res.send(books_by_name);
});

module.exports = route;
