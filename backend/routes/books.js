const express = require("express");
const route = express.Router();
const { Book } = require("../models/book");
// const upload = require("../middleware/upload");
const multer = require("multer");
const upload = multer({ dest: "uploads" });
const { uploadFile, getFileStream } = require("../s3");
const fs = require("fs");
const path = require("path");

// route.post("/:id", (req, res) => {
//   const id = req.params.id;
// });
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

route.post("/get_books_by_name", (req, res) => {
  console.log("name" + req.body.name);
  if (req.body.name) {
    const regex = new RegExp(escapeRegex(req.body.name), "gi");
    // console.log("reg:" + regex);
    Book.find({ name: regex }, (err, books) => {
      if (err) {
        console.log(err);
      } else {
        return res.send(books);
      }
    });
  }
});

route.post("/get_books_by_author", async (req, res) => {
  if (req.body.author) {
    const regex = new RegExp(escapeRegex(req.body.author), "gi");
    console.log("reg:" + regex);
    Book.find({ author: regex }, (err, books) => {
      if (err) {
        console.log(err);
      } else {
        return res.send(books);
      }
    });
  }
});

route.post("/create", upload.single("photo"), async (req, res) => {
  let photo = "";
  let newone = new Book({
    name: req.body.name,
    author: req.body.author,
    description: req.body.description,
    rating: req.body.rating,
    InStock: req.body.InStock,
    tags: req.body.tags,
    price: req.body.price,
  });
  if (req.file) {
    // newone.photo = req.file.path;
    photo = await uploadFile(req.file);
    newone.photo = photo["key"];
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
  delete allbooks["_id"];
  return res.send(allbooks);
});

route.get("/images/:key", (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

route.get("/:counter", async (req, res) => {
  if (req.params.counter) {
    try {
      const book = await Book.findOne({ Count: req.params.counter });
      delete book["_id"];
      return res.send(book);
    } catch (e) {
      return res.statusMessage(e.message).send;
    }
  }
});

module.exports = route;
