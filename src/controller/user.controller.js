const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const { HttpMessage, HttpMessageCode } = require("../constants");
const { sendMail } = require("../services/emailsend");

/**
 * user Registration
 * route api/v1/register
 *
 * @param {string} fullName
 * @param {string} email
 * @param {string} password
 * @returns {message}
 * @access public
 * @discription user registration
 */

// function AddMinutesToDate(date, minutes) {
//   return new Date(date.getTime() + minutes * 60000);
// }

exports.registerHandler = async (req, res, _) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    var token = Math.random();
    token = token * 1000000;
    token = parseInt(token);
    const now = new Date();
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
      message: HttpMessage.PLEASE_VERIFY_EMAIL,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(HttpMessageCode.INTERNAL_SERVER_ERROR)
      .send({ message: HttpMessage.INTERNAL_SERVER_ERROR });
  }
};

/**
 *  route api/v1/confirm
 *  OTP verification controller
 *
 * @param {string} confirmationCode
 * @returns {message}
 * @access public
 * @discription user token verification controller.
 */

exports.verifyUser = async (req, res, next) => {
  try {
    const { confirmationCode } = req.body;
    const test = await User.findOne({ confirmationCode: confirmationCode });
    if (!test)
      return res
        .status(HttpMessageCode.UNAUTHORIZED)
        .send({ message: "invalid otp" });
    test.isVerified = true;
    await test.save();
    return res.json({
      statusCode: HttpMessageCode.CREATED,
      message: HttpMessage.OK,
      data: test,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(HttpMessageCode.INTERNAL_SERVER_ERROR)
      .json({ message: HttpMessage.INTERNAL_SERVER_ERROR });
  }
};

/**
 * end point api/v1/resend
 * resend otp api
 *
 * @param {Number} confirmationCode
 * @returns {message}
 * @access public
 * @discription user token verification controller.
 */

exports.resendOtp = async (req, res, next) => {
  try {
    var token = Math.random();
    token = token * 1000000;
    token = parseInt(token);
    const user = await User.findOne().sort({ _id: -1 });
    const _id = user.id;
    await User.findByIdAndUpdate(
      _id,
      {
        confirmationCode: token,
      },
      { new: true }
    );
    await sendMail(user.email, token);
    return res.json({
      statusCode: HttpMessageCode.CREATED,
      message: "resend otp successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(HttpMessageCode.INTERNAL_SERVER_ERROR)
      .json({ message: HttpMessage.INTERNAL_SERVER_ERROR });
  }
};

/**
 *Login Controller
 * api end point api/v1/login
 *
 * @param {String} email
 * @param {String} password
 * @returns {message}
 * @access public
 * @discription user token verification controller.
 */

exports.loginHandler = async (req, res, _) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
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

/**
 * Get user Api
 * api route api/v1/login
 *
 * @param {string} email
 * @param {string} password
 * @returns {message}
 * @access public
 * @discription get all user api .
 */
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
