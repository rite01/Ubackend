const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const { HttpMessage, HttpMessageCode } = require("../constants");
const { sendMail } = require("../services/emailsend");
const { ApiError } = require("../middelwere/errorhandler");

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

exports.registerHandler = async (req, res, next) => {
  try {
    const { email, fullName, password } = req.body;
    const user = await User.findOne({ email });
    if (user)
      return next(
        new ApiError(
          HttpMessageCode.CONFLICT,
          HttpMessage.USER_ALREADY_REGISTER
        )
      );
    const data = await User({
      fullName,
      email,
      password,
    }).save();
    const newCode = data.confirmationCode;
    await sendMail(email, newCode);
    return next(
      new ApiError(HttpMessageCode.CREATED, HttpMessage.PLEASE_VERIFY_EMAIL)
    );
  } catch (error) {
    return next(
      new ApiError(
        HttpMessageCode.INTERNAL_SERVER_ERROR,
        HttpMessage.INTERNAL_SERVER_ERROR
      )
    );
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
      return next(
        new ApiError(HttpMessageCode.UNAUTHORIZED, HttpMessage.INVALID_OTP)
      );
    test.isVerified = true;
    if (test.isVerified != true)
      return next(
        new ApiError(HttpMessageCode.UNAUTHORIZED, HttpMessage.ALREADY_VERIFY)
      );
    await test.save();
    return next(
      new ApiError(HttpMessageCode.CREATED, HttpMessage.EMAIL_VERIFIED)
    );
  } catch (error) {
    return next(
      new ApiError(
        HttpMessageCode.INTERNAL_SERVER_ERROR,
        HttpMessage.INTERNAL_SERVER_ERROR
      )
    );
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
    const data = await User.findByIdAndUpdate(
      _id,
      {
        confirmationCode: token,
      },
      { new: true }
    );
    await sendMail(data.email, data.confirmationCode);
    return next(new ApiError(HttpMessageCode.CREATED, HttpMessage.OTP_RESEND));
  } catch (error) {
    return next(
      new ApiError(
        HttpMessageCode.INTERNAL_SERVER_ERROR,
        HttpMessage.INTERNAL_SERVER_ERROR
      )
    );
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

exports.loginHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.isPasswordMatched(password))
      return next(
        new ApiError(HttpMessageCode.UNAUTHORIZED, HttpMessage.INVALID_EMAIL)
      );
    if (!user.isVerified) {
      return next(
        new ApiError(
          HttpMessageCode.NOT_FOUND,
          HttpMessage.USER_EMAIL_NOT_VERIFIED
        )
      );
    }
    const token = user.generateAuthToken();
    return next(
      new ApiError(HttpMessageCode.OK, HttpMessage.LOGIN_SUCCESSFULLY, {
        token: token,
      })
    );
  } catch (error) {
    return next(
      new ApiError(HttpMessageCode.INTERNAL_SERVER_ERROR, error.message)
    );
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

exports.getUser = async (req, res, next) => {
  try {
    const userList = await User.find({});
    if (userList.length === 0)
      return next(
        new ApiError(HttpMessageCode.BAD_REQUEST, HttpMessage.BAD_REQUEST)
      );
    return next(
      new ApiError(HttpMessageCode.OK, HttpMessage.USER_FOUND, {
        data: userList,
      })
    );
  } catch (err) {
    return next(
      new ApiError(HttpMessageCode.BAD_REQUEST, json({ error: err.message }))
    );
  }
};
