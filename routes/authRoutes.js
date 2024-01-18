const express = require("express");

const {
  registerController,
  loginController,
  updateProfileController,
} = require("../controller/authController");

const route = express.Router();

route.post("/register", registerController);
route.post("/login", loginController);
route.put('/update-profile', updateProfileController)

module.exports = route;
