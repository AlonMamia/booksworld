const express = require("express");
const helmet = require("helmet");
const app = express();
const books = require("./routes/books");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use("/uploads", express.static("uploads"));
app.use("/books", books);

app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(5000, () => {
  console.log(`listening on port 5000`);
});
