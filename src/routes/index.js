const restRouter = require("express").Router();
const {
  Routes: { AUTH, PRODUCT, CART, ADMIN },
} = require("../constants");
const { authRouter } = require("./auth.route");
const { productRoute } = require("./product.route");
const { cartRoute } = require("./cart.route");
const { adminRoute } = require("./admin.route");

restRouter.use(AUTH.DEFAULT, authRouter);
restRouter.use(PRODUCT.DEFAULT, productRoute);
restRouter.use(CART.DEFAULT, cartRoute);
restRouter.use(ADMIN.DEFAULT, adminRoute);

module.exports = { restRouter };
