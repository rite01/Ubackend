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
    const { email } = req.body;
    const user = await User.findOne({ email });
    var token = Math.random();
    token = token * 1000000;
    token = parseInt(token);
    if (user)
      return res
        .status(HttpMessageCode.CONFLICT)
        .send({ message: HttpMessage.EDUCATOR_ALREADY_REGISTER });
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const data = await User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashPassword,
      confirmationCode: token,
      role: "educator",
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
 * api end point api/v1//educator/login
 *
 * @param {String} email
 * @param {String} password
 * @access public
 * @discription Educator token verification controller.
 */

exports.educatorLoginHandler = async (req, res, _) => {
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
    const educatorToken = user.generateAuthToken();
    return res.status(HttpMessageCode.OK).json({
      educatortoken: educatorToken,
      message: HttpMessage.EDUCATOR_LOGIN_SUCCESSFULLY,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(HttpMessageCode.INTERNAL_SERVER_ERROR)
      .json({ message: HttpMessage.INTERNAL_SERVER_ERROR });
  }
};
