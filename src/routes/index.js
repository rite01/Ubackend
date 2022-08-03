const restRouter = require("express").Router();
const {
  Routes: { AUTH, PRODUCT },
} = require("../constants");
const { authRouter } = require("./auth.route");
const { productRoute } = require("./product.route");

restRouter.use(AUTH.DEFAULT, authRouter);
restRouter.use(PRODUCT.DEFAULT, productRoute);

module.exports = { restRouter };
