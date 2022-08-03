const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  product: [
    {
      productId: { type: mongoose.schema.Types.ObjectId, ref: "products" },
    },
  ],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

const Cart = mongoose.model("cart", cartSchema);
module.exports = Cart;
