const express = require("express");
const { getCategoryController, getSingleCategory, selectedCategoryController, createCategoryController, updatedCategoryController, deleteCategoryController } = require("../controller/categoryController");

const route = express.Router();
// Create category
route.post('/create-category', createCategoryController)
// Get Category
route.get('/get-category', getCategoryController)
// Single Category
route.get('/single-category/:slug', getSingleCategory)
// Selected Category controller
route.get('/selected-category/:slug', selectedCategoryController)
// updated Category
route.put('/updated-category/:id', updatedCategoryController)
// Delete Category
route.delete('/delete-category/:id', deleteCategoryController)

module.exports = route;
