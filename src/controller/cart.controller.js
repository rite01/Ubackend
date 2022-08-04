const { Cart } = require("../models/cartModel");
const { Product } = require("../models/productModel");
const { HttpMessage, HttpMessageCode } = require("../constants");

exports.addCart = async (req, res, _) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(422).json({ error: "plz add" });
    }
    const cartFound = await Cart.findOne({ userId: req.user.id });
    let createCart;
    if (cartFound) {
      let productInCart = cartFound.productId.find((item) => {
        let itemId = item.productId
          .toString()
          .replace(/ObjectId\("(.*)"\)/, "$1");
        return itemId === productId;
      });
      if (productInCart) {
        return res.status(422).json({ error: "Posts has been already added" });
      }
    }
    addCart = new Cart({
      productId: productId,
      userId: req.user.id,
    });
    createCart = await addCart.save();
    console.log(addCart);

    return res.status(201).json({
      statusCode: 201,
      message: "added to cart successfully",
      data: createCart,
    });
  } catch (err) {
    return res.status(422).json({ error: err.message });
  }
};
