const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const { HttpMessage, HttpMessageCode } = require("../constants");
const config = require("../config/nodemail");
var jwt = require("jsonwebtoken");

//Admin Registration
exports.adminregisterHandler = async (req, res, _) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const token = jwt.sign({ email: req.body.email }, config.secret);
    if (user)
      return res
        .status(HttpMessageCode.CONFLICT)
        .send({ message: HttpMessage.ADMIN_ALREADY_REGISTER });
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const data = await User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashPassword,
      confirmationCode: token,
      isVerified: true,
      roles: "admin",
    }).save();
    return res.status(HttpMessageCode.CREATED).json({
      message: HttpMessage.ADMIN_REGISTER,
      data: data,
    });
  } catch (error) {
    return res
      .status(HttpMessageCode.INTERNAL_SERVER_ERROR)
      .send({ message: HttpMessage.INTERNAL_SERVER_ERROR });
  }
};

//Admin Controller
exports.adminloginHandler = async (req, res, _) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(HttpMessageCode.UNAUTHORIZED)
        .send({ message: HttpMessage.INVALID_EMAIL });
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res
        .status(HttpMessageCode.UNAUTHORIZED)
        .json({ message: HttpMessage.INVALID_EMAIL });
    const token = user.generateAuthToken();
    return res
      .status(HttpMessageCode.OK)
      .json({ data: token, message: HttpMessage.ADMIN_LOGIN_SUCCESSFULLY });
  } catch (error) {
    return res
      .status(HttpMessageCode.INTERNAL_SERVER_ERROR)
      .json({ message: HttpMessage.INTERNAL_SERVER_ERROR });
  }
};
