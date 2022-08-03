const jwt = require("jsonwebtoken");
const { HttpMessageCode, HttpMessage } = require("../constants");
const { User } = require("../models/user");

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res
      .status(HttpMessageCode.UNAUTHORIZED)
      .json({ error: HttpMessage.MUST_BE_LOGIN });
  }
  const token = authorization.replace("Bearer ", "");
  const key = process.env.JWTPRIVATEKEY;
  jwt.verify(token, key, (err, payload) => {
    if (err) {
      return res
        .status(HttpMessageCode.UNAUTHORIZED)
        .json({ error: HttpMessage.MUST_BE_LOGIN });
    }
    const { _id } = payload;
    User.findById(_id).then((userData) => {
      req.user = userData;
      next();
    });
  });
};

module.exports = { verifyToken };
