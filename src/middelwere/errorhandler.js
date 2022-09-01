const { HttpMessageCode, HttpMessage } = require("../constants");

class ApiError {
  constructor(statusCode, message) {
      this.message = message
      this.statusCode = statusCode
  }
}
errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).send({
      statusCode: err.statusCode,
      message: err.message,
    });
  } else {
    return res.status(HttpMessageCode.INTERNAL_SERVER_ERROR).send({
      statusCode: HttpMessageCode.INTERNAL_SERVER_ERROR,
      message: HttpMessage.INTERNAL_SERVER_ERROR,
    });
  }
};
module.exports = {ApiError, errorHandler };
