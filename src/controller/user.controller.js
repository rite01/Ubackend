const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const { HttpMessage, HttpMessageCode } = require("../constants");
const config = require("../config/nodemail");
var jwt = require("jsonwebtoken");
const { sendMail } = require("../services/emailsend");

//user Registration
exports.registerHandler = async (req, res, _) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const token = jwt.sign({ email: req.body.email }, config.secret);
    if (user)
      return res
        .status(HttpMessageCode.CONFLICT)
        .send({ message: HttpMessage.USER_ALREADY_REGISTER });
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const data = await User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashPassword,
      confirmationCode: token,
    }).save();
    const newCode = data.confirmationCode;
    await sendMail(req.body.email, newCode);
    return res.status(HttpMessageCode.CREATED).json({
      message: HttpMessage.USER_REGISTER,
      msg: HttpMessage.PLEASE_VERIFY_EMAIL,
    });
  } catch (error) {
    return res
      .status(HttpMessageCode.INTERNAL_SERVER_ERROR)
      .send({ message: HttpMessage.INTERNAL_SERVER_ERROR });
  }
};

exports.verifyUser = async (req, res, next) => {
  try {
    const test = await User.findOne({
      confirmationCode: req.params.confirmationCode,
    });
    if (!test) {
      return res
        .status(HttpMessageCode.NOT_FOUND)
        .send({ message: HttpMessage.USER_NOT_FOUND });
    }
    test.isVerified = true;
    await test.save();
    return res.json({
      statusCode: HttpMessageCode.CREATED,
      message: HttpMessage.OK,
      data: test,
    });
  } catch (error) {
    return res
      .status(HttpMessageCode.INTERNAL_SERVER_ERROR)
      .json({ message: HttpMessage.INTERNAL_SERVER_ERROR });
  }
};

//Login Controller
exports.loginHandler = async (req, res, _) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user.isVerified) {
      return res.status(HttpMessageCode.NOT_FOUND).send({
        message: HttpMessage.USER_EMAIL_NOT_VERIFIED,
      });
    }
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
      .json({ data: token, message: HttpMessage.LOGIN_SUCCESSFULLY });
  } catch (error) {
    return res
      .status(HttpMessageCode.INTERNAL_SERVER_ERROR)
      .json({ message: HttpMessage.INTERNAL_SERVER_ERROR });
  }
};

//Get user Api
exports.getUser = async (req, res, _) => {
  try {
    const userList = await User.find({});
    if (userList.length === 0) {
      return res
        .status(HttpMessageCode.BAD_REQUEST)
        .json({ message: HttpMessage.NO_DATA_FOUND });
    } else
      return res
        .status(HttpMessageCode.OK)
        .json({ message: HttpMessage.USER_FOUND, data: userList });
  } catch (err) {
    return res.status(HttpMessageCode.BAD_REQUEST).json({ error: err.message });
  }
};
