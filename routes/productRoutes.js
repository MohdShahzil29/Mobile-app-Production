const express = require("express");
const {
  productListController,
  productPhotoController,
  getSingleProductController,
  productCountController,
  createProductController,
  getAllProductsController,
  getUserPostController,
  getSearchController,
} = require("../controller/productController");
const formidable = require("express-formidable");

const route = express.Router();
route.post("/create-products", formidable(),  createProductController);
route.get('/get-all-products', getAllProductsController)
route.get("/product-list", productListController);
route.get("/get-photo/:pid", productPhotoController);
route.get("/single-product/:slug", getSingleProductController);
route.get("/product-count", productCountController);
route.get('/get-user-post', getUserPostController)
route.get('/search/:keyword', getSearchController)
module.exports = route;
