const { Product } = require("../models/productModel");
const { HttpMessage, HttpMessageCode } = require("../constants");
const cloudinary = require("../services/clodinary");
const { ProductDetail } = require("../models/productDetail");

/**
 * route api/v1/create
 *
 * @param {string} heading
 * @param {string} title
 * @param {Number} price
 * @param {Number} updateDate
 * @param {Boolean} bestSeller
 * @param {string} image
 * @param {string} courseTitle
 * @param {string} discription
 * @param {Number} numReview
 * @param {string} discription
 * @param {string} courseSummry
 * @param {string} aboutProduct
 * @returns {message}
 * @access public
 * @discription Product Create Controller
 */

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
    console.log("error", error);
    return res
      .status(HttpMessageCode.INTERNAL_SERVER_ERROR)
      .json({ message: error });
  }
};

/**
 * Route api/v1/get/product
 *
 * @param {String} detail
 * @access public
 * @returns {message}
 * @discription Get product Api controller.
 */
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

/**
 * Route api/v1/get/product/bytitle/:navtitle
 *
 * @param {String} navTitle
 * @access public
 * @returns {message}
 * @discription Get Product By Title controller.
 */
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

/**
 * Route api/v1/get/product/:id
 *
 * @param {String} id
 * @access public
 * @returns {message}
 * @discription Get Single Product controller.
 */
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

/**
 * Route api/v1/update/product/:id
 *
 * @param {String} id
 * @access public
 * @returns {message}
 * @discription update Product controller.
 */
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

/**
 * Route api/v1/get/product/:id
 *
 * @param {String} _id
 * @access public
 * @returns {message}
 * @discription Delete Single Product controller.
 */
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
