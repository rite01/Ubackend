const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  heading: { type: String, require: true },
  title: { type: String, require: true },
  image: {
    public_id: { type: String, require: true },
    url: { type: String, require: true },
  },
  price: { type: Number, require: true },
  updateDate: { type: String, require: true },
  bestSeller: { type: Boolean, default: false },
  detail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productdetail",
  },
});

const Product = mongoose.model("products", productSchema);

module.exports = { Product };
