const cartRoute = require("express").Router();
const {
  Routes: { CART },
} = require("../constants");
const { addCart } = require("../controller/cart.controller");
const { verifyToken } = require("../middelwere/authCheck");

cartRoute.post(CART.ADDTOCART,verifyToken, addCart);

module.exports = { cartRoute };
