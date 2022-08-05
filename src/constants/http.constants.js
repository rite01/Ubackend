const HttpMessage = {
  INVALID_EMAIL: "invalid email or password",
  LOGIN_SUCCESSFULLY: "Login SuccessFully",
  INTERNAL_SERVER_ERROR: "server error try again later",
  USER_ALREADY_REGISTER:
    "User already registers please user another email or number",
  USER_REGISTER: "User Registration successfully",
  NO_DATA_FOUND: "there is no data",
  USER_FOUND: "user found",
  PRODUCT_FOUND: "product found",
  EMPTY_FIELDS: "Don't put email and password to be empty",
  MUST_BE_LOGIN: "you must be logged in",
  PRODUCT_EMPTY_FIELDS: "Don't put empty field",
  PRODUCT_CREATED_SUCCESSFULLY: "Product created successfully",
  GET_SINGLE_PRODUCT: "Get Single Product",
  GET_PRODUCT_BY_TITLE: "Product List",
  DELETE_SINGLE_PRODUCT: "Delete product SuccessFully",
  POST_ADD_ALREADY: "Posts has been already added",
  PLEASE_ADD_PRODUCT: "Please Add",
  ADD_PRODUCT_SUCCESSFULLY: "added to cart successfully",
  NO_CART: "there is no cart of user",
  NO_DATA_FOUND_FROM_THIS_ID: "no cart details found with this id ",
  PRODUCT_NOT_FOUND:"product not found"
};

module.exports = { HttpMessage };
