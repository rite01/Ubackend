const Routes = {
  AUTH: {
    DEFAULT: "/",
    REGISTER: "/register",
    LOGIN: "/login",
    ALLUSER: "/alluser",
  },
  PRODUCT: {
    DEFAULT: "/",
    POSTCREATE: "/create",
    GETPRODUCT: "/get/product",
    GETPRODUCTBYID: "/get/product/:id",
    GETPRODUCTBYTITLE: "/get/product/bytitle/:navtitle",
    DELETEPRODUCT: "/delete/product/:id",
    UPDATEPRODUCT: "/update/product/:id",
  },
};

module.exports = { Routes };
