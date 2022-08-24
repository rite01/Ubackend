const educatorRoute = require("express").Router();
const {
  Routes: { EDUCATOR },
} = require("../constants");
const {
  educatorRegisterHandler,
  educatorLoginHandler,
} = require("../controller/educator.controller");
const { verifyUser, resendOtp } = require("../controller/user.controller");
const { userValidation } = require("../validations");

educatorRoute.post(
  EDUCATOR.EDUCATORREGISTER,
  userValidation,
  educatorRegisterHandler
);
educatorRoute.post(EDUCATOR.EDUCATORLOGIN, educatorLoginHandler);
educatorRoute.post(EDUCATOR.VERIFY_OTP, verifyUser);
educatorRoute.post(EDUCATOR.RESEND_OTP, resendOtp);

module.exports = { educatorRoute };
