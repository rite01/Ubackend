const multer = require("multer");
const path = require("path");
const uploadFile = multer({
  storage: multer.diskStorage({
    // destination: function (req, file, cb) {
    //   console.log("file", file);
    //   cb(null, path.resolve(__dirname, "../upload"));
    // },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  }),
}).single("image");

module.exports = { uploadFile };
