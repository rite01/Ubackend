const adminRoute = require("express").Router();
const {
  Routes: { ADMIN },
} = require("../constants");
const {
  adminregisterHandler,
  adminloginHandler,
} = require("../controller/admin.controller");
// const { verifyToken } = require("../middelwere/authCheck");

adminRoute.post(ADMIN.ADMINREGISTER, adminregisterHandler);
adminRoute.post(ADMIN.ADMINLOGIN, adminloginHandler);

module.exports = { adminRoute };
