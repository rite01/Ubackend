const { HttpMessage } = require("../constants");

const checkRole =
  (...role) =>
  (req, res, next) => {
    if (!role.includes(req?.user?.role)) {
      return res.json({ msg: HttpMessage.YOU_ARE_NOT_AUTHORIZED });
    }
    next();
  };

module.exports = { checkRole };
