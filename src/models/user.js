const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fullName: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
});

//Token Generater
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "15d",
  });
  return token;
};

const User = mongoose.model("user", userSchema);

module.exports = { User };
