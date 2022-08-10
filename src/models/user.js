const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fullName: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  isVerified: {
    type: Boolean,
    default: false,
  },
  confirmationCode: {
    type: String,
    unique: true,
  },
  roles: {
    type: String,
    enum: ["user", "admin", "educator"],
    default: "user",
  },
});

//Token Generater
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};
userSchema.methods.generateEducatorToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "2d",
  });
  return token;
};

const User = mongoose.model("user", userSchema);

module.exports = { User };
