const joi = require("joi");

exports.productValidation = (req, res, next) => {
  const productSchema = joi.object({
    navTitle: joi.string().required().label("Title"),
    productTitle: joi.string().required().label("Product Title"),
    productDiscription: joi.string().required().label("Product discription"),
    courseTitle: joi.string().required().label("Course Title"),
    courseAuther: joi.string().required().label("Course Auther"),
    avg_rating: joi.number().required().label("Avg Rating"),
    price: joi.number().required().label("Price"),
    updateDate: joi.number().required().label("Update Date"),
    hours: joi.number().required().label("course Hours"),
    courseSummry: joi.string().required().label("Course Summry"),
    aboutProduct: joi.string().required().label("About Product"),
    bestSeller: joi.string().required().label("Best Seller"),
    numReview: joi.number().required().label("New Review"),
  });
  if (!req.file) {
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
