const productRoute = require("express").Router();
const {
  Routes: { PRODUCT },
} = require("../constants");
const {
  productCreate,
  getProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  getProductByTitle,
} = require("../controller/product");
const { verifyToken } = require("../middelwere/authCheck");
const { uploadFile } = require("../services/multer");
const { productValidation } = require("../validations");

//Product Route
productRoute.post(
  PRODUCT.POSTCREATE,
  verifyToken,
  uploadFile,
  productValidation,
  productCreate
);
productRoute.get(PRODUCT.GETPRODUCT, getProduct);
productRoute.get(PRODUCT.GETPRODUCTBYID, getSingleProduct);
productRoute.delete(PRODUCT.DELETEPRODUCT, deleteProduct);
productRoute.patch(PRODUCT.UPDATEPRODUCT, updateProduct);
productRoute.get(PRODUCT.GETPRODUCTBYTITLE, getProductByTitle);

module.exports = { productRoute };
