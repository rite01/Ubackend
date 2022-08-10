const Routes = {
  AUTH: {
    DEFAULT: "/",
    REGISTER: "/register",
    VERIFY: "/confirm/:confirmationCode",
    LOGIN: "/login",
    ALLUSER: "/alluser",
  },
  EDUCATOR: {
    DEFAULT: "/",
    EDUCATORREGISTER: "/educator/register",
    EDUCATORLOGIN: "/educator/login",
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
    REMOVECART: "/removecart/:id",
  },
};

module.exports = { Routes };
