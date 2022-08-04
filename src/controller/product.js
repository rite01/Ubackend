const { Product } = require("../models/productModel");
const { HttpMessage, HttpMessageCode } = require("../constants");
const cloudinary = require("../services/clodinary");

//create Product
exports.productCreate = async (req, res, _) => {
  try {
    const image = req.file.path;
    const {
      navTitle,
      productTitle,
      productDiscription,
      courseTitle,
      courseAuther,
      avg_rating,
      price,
      updateDate,
      hours,
      courseSummry,
      aboutProduct,
      bestSeller,
      numReview,
    } = req.body;
    const result = await cloudinary.uploader.upload(image, {
      folder: "products",
    });
    const productCreate = new Product({
      navTitle,
      productTitle,
      productDiscription,
      courseTitle,
      image: { public_id: result.public_id, url: result.secure_url },
      courseAuther: req.user.id,
      avg_rating,
      price,
      updateDate,
      hours,
      courseSummry,
      aboutProduct,
      bestSeller,
      numReview,
    });
    await productCreate.save();
    res.status(HttpMessageCode.CREATED).json({
      message: HttpMessage.PRODUCT_CREATED_SUCCESSFULLY,
      data: productCreate,
    });
  } catch (error) {
    res
      .status(HttpMessageCode.INTERNAL_SERVER_ERROR)
      .json({ message: HttpMessage.INTERNAL_SERVER_ERROR });
  }
};

//Get product Api
exports.getProduct = async (req, res, _) => {
  try {
    const productList = await Product.find({}).populate("courseAuther");
    if (productList.length === 0) {
      return res
        .status(HttpMessageCode.BAD_REQUEST)
        .json({ message: HttpMessage.NO_DATA_FOUND });
    } else
      return res
        .status(HttpMessageCode.OK)
        .json({ message: HttpMessage.PRODUCT_FOUND, data: productList });
  } catch (err) {
    res.status(HttpMessageCode.BAD_REQUEST).json({ error: err.message });
  }
};

//Get Product By Title
exports.getProductByTitle = async (req, res, _) => {
  const navTitle = req.params.navtitle;
  const data = await Product.find({ navTitle });
  return res.status(HttpMessageCode.OK).json({
    statusCode: HttpMessageCode.OK,
    message: `Product List ${navTitle}`,
    data,
  });
};

//Get Single Product
exports.getSingleProduct = async (req, res, _) => {
  const _id = req.params.id;
  const data = await Product.findOne({ _id }).populate("courseAuther");
  return res.status(HttpMessageCode.OK).json({
    statusCode: HttpMessageCode.OK,
    message: HttpMessage.GET_SINGLE_PRODUCT,
    data,
  });
};

//update Product
exports.updateProduct = async (req, res, _) => {
  const _id = req.params.id;
  const data = await Product.findByIdAndUpdate(
    req.params.id,
    {
      navTitle: req.body.navTitle,
      productTitle: req.body.productTitle,
      productDiscription: req.body.productDiscription,
      courseTitle: req.body.courseTitle,
      image: req.body.image,
      courseAuther: req.body.courseAuther,
      avg_rating: req.body.avg_rating,
      price: req.body.price,
      updateDate: req.body.updateDate,
      hours: req.body.hours,
      courseSummry: req.body.courseSummry,
      aboutProduct: req.body.aboutProduct,
      bestSeller: req.body.bestSeller,
      numReview: req.body.numReview,
    },
    { new: true }
  );
  if (!data) {
    return res.status(404).send({
      message: "Product not found with id " + _id,
    });
  }
  res.send(data);
  // res.status(201).json({
  //   message: "Thing updated successfully!",
  // });
};

//Delete Product Api
exports.deleteProduct = async (req, res, _) => {
  const _id = req.params.id;
  const data = await Product.findOneAndDelete({ id: _id });
  return res.status(HttpMessageCode.OK).json({
    statusCode: HttpMessageCode.OK,
    message: HttpMessage.DELETE_SINGLE_PRODUCT,
    data,
  });
};
