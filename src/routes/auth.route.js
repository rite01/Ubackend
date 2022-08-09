const authRouter = require("express").Router();
const {
  Routes: { AUTH },
} = require("../constants");
const {
  loginHandler,
  registerHandler,
  getUser,
  verifyUser,
} = require("../controller/user.controller");

const { userValidation } = require("../validations");

//user log
authRouter.post(AUTH.REGISTER, userValidation, registerHandler);
authRouter.get(AUTH.VERIFY, verifyUser);
authRouter.post(AUTH.LOGIN, loginHandler);
authRouter.get(AUTH.ALLUSER, getUser);

module.exports = { authRouter };
