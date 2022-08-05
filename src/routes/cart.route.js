const cartRoute = require("express").Router();
const {
  Routes: { CART },
} = require("../constants");
const { addCart, getCartProduct,removeCart } = require("../controller/cart.controller");
const { verifyToken } = require("../middelwere/authCheck");

cartRoute.post(CART.ADDTOCART, verifyToken, addCart);
cartRoute.get(CART.GETCART, verifyToken, getCartProduct);
cartRoute.delete(CART.REMOVECART, verifyToken, removeCart);

module.exports = { cartRoute };
