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
  CART: {
    DEFAULT: "/",
    ADDTOCART: "/addcart",
    GETCART: "/getcart",
    REMOVECART:"/removecart/:id"
  },
};

module.exports = { Routes };
