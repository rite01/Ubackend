const authRouter = require("express").Router();
const {
  Routes: { AUTH },
} = require("../constants");
const {
  loginHandler,
  registerHandler,
  getUser,
} = require("../controller/user.controller");

const { userValidation } = require("../validations");

//user log
authRouter.post(AUTH.REGISTER, userValidation, registerHandler);
authRouter.post(AUTH.LOGIN, loginHandler);
authRouter.get(AUTH.ALLUSER, getUser);

module.exports = { authRouter };
