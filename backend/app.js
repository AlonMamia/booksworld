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

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", function (_, res) {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"), function(err){
    if(err){
      res.status(500).send(err)
    }
  });
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`listening on port 5000`);
});
