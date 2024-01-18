const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name is require"],
  },
  email: {
    type: String,
    require: [true, "Email is require"],
  },
  phone: {
    type: Number,
    require: [true, "Phone number is require"],
  },
  password: {
    type: String,
    require: [true, "Password is require"],
  },
  address: {
    type: String,
    require: [true, "user address require"],
  },
  role: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("User", userSchema);
