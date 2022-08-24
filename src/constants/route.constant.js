const Routes = {
  AUTH: {
    DEFAULT: "/",
    REGISTER: "/register",
    VERIFY: "/otpverify",
    RESEND: "/resend",
    LOGIN: "/login",
    ALLUSER: "/alluser",
  },
  ADMIN: {
    DEFAULT: "/",
    LOGIN: "/admin/login",
  },
  EDUCATOR: {
    DEFAULT: "/",
    VERIFY_OTP: "/educator/otpverify",
    RESEND_OTP: "/educator/resend",
    EDUCATORREGISTER: "/educator/register",
    EDUCATORLOGIN: "/educator/login",
  },
  PRODUCT: {
    DEFAULT: "/",
    POSTCREATE: "/create",
    GETPRODUCT: "/get/product",
    GETPRODUCTBYTITLE: "/get/product/bytitle/:navtitle",
    GETPRODUCTBYID: "/get/product/:id",
    UPDATEPRODUCT: "/update/product/:id",
    DELETEPRODUCT: "/delete/product/:id",
  },
  CART: {
    DEFAULT: "/",
    ADDTOCART: "/addcart",
    GETCART: "/getcart",
    REMOVECART: "/removecart/:id",
  },
};

module.exports = { Routes };
