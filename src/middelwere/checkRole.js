const { HttpMessage } = require("../constants");

const checkRole =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req?.user?.roles)) {
      return res.json({ msg: HttpMessage.YOU_ARE_NOT_AUTHORIZED });
    }
    next();
  };

module.exports = { checkRole };
