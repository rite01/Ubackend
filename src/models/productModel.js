const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  navTitle: { type: String, require: true },
  productTitle: { type: String, require: true },
  productDiscription: { type: String, require: true },
  image: {
    public_id: { type: String, require: true },
    url: { type: String, require: true },
  },
  courseTitle: { type: String, require: true },
  courseAuther: { type: String, require: true },
  avg_rating: { type: Number, require: true },
  price: { type: Number, require: true },
  updateDate: { type: String, require: true },
  hours: { type: Number, require: true },
  courseSummry: { type: String, require: true },
  aboutProduct: { type: String, require: true },
  bestSeller: { type: String, require: true },
  numReview: { type: Number, require: true },
});

const Product = mongoose.model("products", productSchema);

module.exports = { Product };
