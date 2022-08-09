const { Cart } = require("../models/cartModel");
const { Product } = require("../models/productModel");
const { HttpMessage, HttpMessageCode } = require("../constants");

exports.addCart = async (req, res, _) => {
  try {
    const { id: userId } = req.user;
    const { productId } = req.body;
    if (!productId) {
      return res
        .status(HttpMessageCode.UNPROCESSABLE_ENTITY)
        .json({ error: HttpMessage.PLEASE_ADD_PRODUCT });
    }
    const cartFound = await Cart.findOne({ userId });
    if (cartFound) {
      const productAdd = cartFound.productId.find((i) => i == productId);
      if (productAdd) {
        return res
          .status(HttpMessageCode.UNPROCESSABLE_ENTITY)
          .json({ error: HttpMessage.POST_ADD_ALREADY });
      }
      cartFound.productId.push(productId);
      const createCart = await cartFound.save();
      return res.status(HttpMessageCode.CREATED).json({
        statusCode: HttpMessageCode.CREATED,
        message: HttpMessage.ADD_PRODUCT_SUCCESSFULLY,
        data: createCart,
      });
    } else {
      const addCart = new Cart({ productId, userId });
      createCart = await addCart.save();
      return res.status(HttpMessageCode.CREATED).json({
        statusCode: HttpMessageCode.CREATED,
        message: HttpMessage.ADD_PRODUCT_SUCCESSFULLY,
        data: createCart,
      });
    }
  } catch (err) {
    return res
      .status(HttpMessageCode.UNPROCESSABLE_ENTITY)
      .json({ error: err.message });
  }
};

exports.getCartProduct = async (req, res, _) => {
  try {
    const cartData = await Cart.find({}).populate("productId");
    return res.status(HttpMessageCode.OK).json({ cartData });
  } catch (err) {
    return res.status(HttpMessageCode.BAD_REQUEST).json({ error: err.message });
  }
};

exports.removeCart = async (req, res, _) => {
  try {
    const userId = req.user._id;
    const _id = req.params.id;
    const data = await Cart.findOne({ userId });
    if (!data) {
      return res
        .status(HttpMessageCode.UNPROCESSABLE_ENTITY)
        .json({ error: HttpMessage.NO_CART });
    }
    const found = data.productId.find((element) => element == _id);
    if (!found) {
      return res
        .status(HttpMessageCode.UNPROCESSABLE_ENTITY)
        .json({ error: HttpMessage.NO_DATA_FOUND_FROM_THIS_ID });
    }
    const removeItem = data.productId.find((element) => element != _id);
    data.productId = removeItem;

    // const updateData = await Cart.findOneAndUpdate(
    //   { userId: userId },
    //   { $pull: { productId: _id } },
    //   { new: true }
    // );
    const updateData = await data.save();
    return res.status(HttpMessageCode.OK).json({
      statusCode: HttpMessageCode.OK,
      message: HttpMessage.DELETE_SINGLE_PRODUCT,
      updateData,
    });
  } catch (error) {
    return res.status(HttpMessageCode.BAD_REQUEST).json({ error: err.message });
  }
};
