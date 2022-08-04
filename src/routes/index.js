const restRouter = require("express").Router();
const {
  Routes: { AUTH, PRODUCT, CART },
} = require("../constants");
const { authRouter } = require("./auth.route");
const { productRoute } = require("./product.route");
const { cartRoute } = require("./cart.route");

restRouter.use(AUTH.DEFAULT, authRouter);
restRouter.use(PRODUCT.DEFAULT, productRoute);
restRouter.use(CART.DEFAULT, cartRoute);

module.exports = { restRouter };
