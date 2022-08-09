const { Product } = require("../models/productModel");
const { HttpMessage, HttpMessageCode } = require("../constants");
const cloudinary = require("../services/clodinary");
const { ProductDetail } = require("../models/productDetail");

//create Product
exports.productCreate = async (req, res, _) => {
  try {
    const image = req.file.path;
    const {
      heading,
      title,
      price,
      updateDate,
      bestSeller,
      courseTitle,
      discription,
      numReview,
      hours,
      courseSummry,
      aboutProduct,
    } = req.body;
    const result = await cloudinary.uploader.upload(image);
    const prodDetail = new ProductDetail({
      courseAuther: req.user.id,
      courseTitle,
      discription,
      numReview,
      hours,
      courseSummry,
      bestSeller,
      aboutProduct,
    });
    const test = await prodDetail.save();
    const productCreate = new Product({
      heading,
      title,
      image: { public_id: result.public_id, url: result.secure_url },
      price,
      updateDate,
      bestSeller,
      detail: test.id,
    });
    await productCreate.save();
    return res.status(HttpMessageCode.CREATED).json({
      message: HttpMessage.PRODUCT_CREATED_SUCCESSFULLY,
      data: productCreate,
    });
  } catch (error) {
    return res
      .status(HttpMessageCode.INTERNAL_SERVER_ERROR)
      .json({ message: HttpMessage.INTERNAL_SERVER_ERROR });
  }
};

//Get product Api
exports.getProduct = async (req, res, _) => {
  try {
    const productList = await Product.find({}).populate("detail");
    if (productList.length === 0) {
      return res
        .status(HttpMessageCode.BAD_REQUEST)
        .json({ message: HttpMessage.NO_DATA_FOUND });
    } else
      return res
        .status(HttpMessageCode.OK)
        .json({ message: HttpMessage.PRODUCT_FOUND, data: productList });
  } catch (err) {
    return res.status(HttpMessageCode.BAD_REQUEST).json({ error: err.message });
  }
};

//Get Product By Title
exports.getProductByTitle = async (req, res, _) => {
  try {
    const navTitle = req.params.navtitle;
    const data = await Product.find({ navTitle }).populate("detail");
    return res.status(HttpMessageCode.OK).json({
      statusCode: HttpMessageCode.OK,
      message: `Product List ${navTitle}`,
      data,
    });
  } catch (error) {
    return res.status(HttpMessageCode.BAD_REQUEST).json({ error: err.message });
  }
};

//Get Single Product
exports.getSingleProduct = async (req, res, _) => {
  try {
    const id = req.params.id;
    const data = await Product.findOne({ id }).populate("detail");
    return res.status(HttpMessageCode.OK).json({
      statusCode: HttpMessageCode.OK,
      message: HttpMessage.GET_SINGLE_PRODUCT,
      data,
    });
  } catch (error) {
    return res.status(HttpMessageCode.BAD_REQUEST).json({ error: err.message });
  }
};

//update Product
exports.updateProduct = async (req, res, _) => {
  try {
    const id = req.params.id;
    const data = await Product.findByIdAndUpdate(
      id,
      {
        heading: req.body.heading,
        title: req.body.title,
        price: req.body.price,
        updateDate: req.body.updateDate,
        bestSeller: req.body.bestSeller,
      },
      { new: true }
    );
    if (!data) {
      return res.status(HttpMessageCode.BAD_REQUEST).send({
        message: HttpMessage.PRODUCT_NOT_FOUND + _id,
      });
    }
    return res.status(HttpMessageCode.OK).json({
      statusCode: HttpMessageCode.OK,
      message: HttpMessage.DELETE_SINGLE_PRODUCT,
      data,
    });
  } catch (error) {
    return res.status(HttpMessageCode.BAD_REQUEST).json({ error: err.message });
  }
};

//Delete Product Api
exports.deleteProduct = async (req, res, _) => {
  try {
    const _id = req.params.id;
    const data = await Product.findOneAndDelete({ id: _id });
    return res.status(HttpMessageCode.OK).json({
      statusCode: HttpMessageCode.OK,
      message: HttpMessage.DELETE_SINGLE_PRODUCT,
      data,
    });
  } catch (error) {
    return res.status(HttpMessageCode.BAD_REQUEST).json({ error: err.message });
  }
};
