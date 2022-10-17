const multer = require("multer");
const path = require("path");
const { uploadFile } = require("./s3");

var storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

// var upload = multer({
//   storage: storage,
//   fileFilter: (req, file, callback) => {
//     if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
//       callback(null, true);
//     } else {
//       console.log("only images are supported");
//       callback(null, false);
//     }
//   },
//   limits: {
//     fileSize: 1024 * 1024 * 2,
//   },
// });



module.exports = upload;
