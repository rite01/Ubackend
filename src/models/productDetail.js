const mongoose = require("mongoose");

const detailSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },
  courseAuther: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  courseTitle: { type: String, require: true },
  discription: { type: String, require: true },
  numReview: { type: Number, require: true },
  hours: { type: Number, require: true },
  courseSummry: { type: String, require: true },
  aboutProduct: { type: String, require: true },
});

const ProductDetail = mongoose.model("productdetail", detailSchema);

module.exports = { ProductDetail };
