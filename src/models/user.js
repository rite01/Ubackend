const mongoose = require("mongoose");
const { jwt } = require("jsonwebtoken");
const { hash, genSalt, compareSync } = require("bcrypt");

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
  role: {
    type: String,
    enum: ["user", "admin", "educator"],
    default: "user",
  },
});

userSchema.pre("save", async function (next) {
  var token = Math.random();
  token = token * 1000000;
  if (this.isModified("password")) {
    const salt = await genSalt(Number(process.env.SALT));
    this.password = await hash(this.password, salt);
  }
  this.confirmationCode = parseInt(token);
  next();
});

//Token Generater
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};
userSchema.methods.isPasswordMatched = function (password) {
  return compareSync(password, this.password);
};
const User = mongoose.model("user", userSchema);

module.exports = { User };
