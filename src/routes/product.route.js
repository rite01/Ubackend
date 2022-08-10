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
const { verifyToken } = require("../middelwere");
const { checkRole } = require("../middelwere/checkRole");
const { uploadFile } = require("../services/multer");
const { productValidation } = require("../validations");

//Product Route
productRoute.post(
  PRODUCT.POSTCREATE,
  verifyToken,
  checkRole("user"),
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
