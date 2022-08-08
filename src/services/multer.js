const multer = require("multer");
const path = require("path");

const uploadFile = multer({
  storage: multer.diskStorage({
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  }),
}).single("image");

module.exports = { uploadFile };
