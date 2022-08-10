const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const checkRole =
  (...roles) =>
  (req, res, next) => {
    console.log(roles, ">>>>>.", req.user);
    if (!roles.includes(req?.user?.roles)) {
      return res.json({ msg: "defghjkl" });
    }
    next();
  };

module.exports = { checkRole };
