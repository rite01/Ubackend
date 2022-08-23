const joi = require("joi");

exports.productValidation = (req, res, next) => {
  const productSchema = joi.object({
    heading: joi.string().required().label("Heading"),
    title: joi.string().required().label("Product Title"),
    price: joi.number().required().label("Price"),
    image: joi.any(),
    updateDate: joi.number().required().label("Update Date"),
    courseTitle: joi.string().required().label("Course Title"),
    discription: joi.string().required().label("Product discription"),
    courseAuther: joi.string().label("Course Auther"),
    hours: joi.number().required().label("course Hours"),
    courseSummry: joi.string().required().label("Course Summry"),
    aboutProduct: joi.string().required().label("About Product"),
  });
  if (!req.body) {
    return res.json({
      message: "file is req",
    });
  }
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.json({
      message: error.details[0].message,
    });
  }
  next();
};
