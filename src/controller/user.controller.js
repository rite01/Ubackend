const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const { HttpMessage, HttpMessageCode } = require("../constants");

//user Registration
exports.registerHandler = async (req, res, _) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res
        .status(HttpMessageCode.SERVER_NOT_PROCEED)
        .json({ error: HttpMessage.EMPTY_FIELDS });
    }
    if (user)
      return res
        .status(HttpMessageCode.CONFLICT)
        .send({ message: HttpMessage.USER_ALREADY_REGISTER });
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPassword }).save();
    res
      .status(HttpMessageCode.CREATED)
      .send({ message: HttpMessage.USER_REGISTER });
  } catch (error) {
    console.log(error);
    res
      .status(HttpMessageCode.INTERNAL_SERVER_ERROR)
      .send({ message: HttpMessage.INTERNAL_SERVER_ERROR });
  }
};

//Login Controller
exports.loginHandler = async (req, res, _) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(HttpMessageCode.SERVER_NOT_PROCEED)
        .json({ error: HttpMessage.EMPTY_FIELDS });
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
    res
      .status(HttpMessageCode.OK)
      .json({ data: token, message: HttpMessage.LOGIN_SUCCESSFULLY });
  } catch (error) {
    console.log(error);
    res
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
    console.log("err", err);
    res.status(HttpMessageCode.BAD_REQUEST).json({ error: err.message });
  }
};
