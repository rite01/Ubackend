const educatorRoute = require("express").Router();
const {
  Routes: { EDUCATOR },
} = require("../constants");
const {
  educatorRegisterHandler,
  educatorLoginHandler,
} = require("../controller/educator.controller");

educatorRoute.post(EDUCATOR.EDUCATORREGISTER, educatorRegisterHandler);
educatorRoute.post(EDUCATOR.EDUCATORLOGIN, educatorLoginHandler);

module.exports = { educatorRoute };
