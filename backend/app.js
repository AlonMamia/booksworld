const express = require("express");
const helmet = require("helmet");
const app = express();
const books = require("./routes/books");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use("/uploads", express.static("uploads"));
app.use("/books", books);

app.listen(5000, () => {
  console.log(`listening on port 5000`);
});
