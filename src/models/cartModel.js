const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    productId: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    active: { type: Boolean, default: true },
    modifiedOn: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Cart = mongoose.model("cart", cartSchema);
module.exports = { Cart };
