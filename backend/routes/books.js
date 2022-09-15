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
    raiting: req.body.raiting,
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

// route.post("/create/", async (req, res) => {
//   console.log("hi");
//   return res.send("hi");
// });

route.get("/all", async (req, res) => {
  let allbooks = await Book.find({});
  return res.send(allbooks);
});

route.get("search/name/:name", async (req, res) => {
  let books_by_name = await Book.find({ name: req.params.name });
  return res.send(books_by_name);
});

route.get("search/author/:author", async (req, res) => {
  let books_by_author = await Book.find({ author: req.params.author });
  return res.send(books_by_author);
});

module.exports = route;
