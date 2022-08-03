const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

exports.userValidation = (req, res, next) => {
  const schema = joi.object({
    fullName: joi.string().required().label("Full Name"),
    email: joi.string().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  const { error, result } = schema.validate(req.body);
  if (error) {
    return res.json({
      message: error.details[0].message,
    });
  }
  next();
};
