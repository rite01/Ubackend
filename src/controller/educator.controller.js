const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const { HttpMessage, HttpMessageCode } = require("../constants");
const { sendMail } = require("../services/emailsend");

/**
 * route api/v1/educator/register
 *
 * @param {string} fullName
 * @param {string} email
 * @param {string} password
 * @returns {message}
 * @access public
 * @discription educator Registration
 */
exports.educatorRegisterHandler = async (req, res, _) => {
  try {
    const { email, fullName, password } = req.body;
    const user = await User.findOne({ email });
    if (user)
      return next(
        new ApiError(
          HttpMessageCode.CONFLICT,
          HttpMessage.EDUCATOR_ALREADY_REGISTER
        )
      );
    const data = await User({
      fullName,
      email,
      password,
      role: "educator",
    }).save();
    const newCode = data.confirmationCode;
    await sendMail(email, newCode);
    return next(
      new ApiError(HttpMessageCode.CREATED, HttpMessage.PLEASE_VERIFY_EMAIL)
    );
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(
        HttpMessageCode.INTERNAL_SERVER_ERROR,
        HttpMessage.INTERNAL_SERVER_ERROR
      )
    );
  }
};

/**
 * api end point api/v1//educator/login
 *
 * @param {String} email
 * @param {String} password
 * @access public
 * @discription Educator token verification controller.
 */

exports.educatorLoginHandler = async (req, res, _) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.isPasswordMatched(password))
      return next(
        new ApiError(HttpMessageCode.UNAUTHORIZED, HttpMessage.INVALID_EMAIL)
      );
    if (!user.isVerified) {
      return res.status(HttpMessageCode.NOT_FOUND).send({
        message: HttpMessage.USER_EMAIL_NOT_VERIFIED,
      });
    }
    const educatorToken = user.generateAuthToken();
    return next(
      new ApiError(
        HttpMessageCode.OK,
        HttpMessage.EDUCATOR_LOGIN_SUCCESSFULLY,
        {
          educatortoken: educatorToken,
        }
      )
    );
  } catch (error) {
    return next(
      new ApiError(HttpMessageCode.INTERNAL_SERVER_ERROR, error.message)
    );
  }
};
