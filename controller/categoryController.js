const slugify = require("slugify");
const categoryModels = require("../model/categoryModels");
const productModel = require("../model/productModels");

const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(500).send({
        success: false,
        message: "Name is require",
      });
    }

    const existingCategory = await categoryModels.findOne({ name });
    if (existingCategory) {
      return res.status(500).send({
        success: false,
        message: "Category Already Exist",
      });
    }

    const category = await new categoryModels({
      name,
      slug: slugify(name),
    }).save();
    res.status(200).send({
      success: false,
      message: "New Category has been created",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Single Category API",
    });
  }
};

const getCategoryController = async (req, res) => {
  try {
    const category = await categoryModels.find({});
    return res.status(200).send({
      success: true,
      message: "Category has been fetched",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Category API",
    });
  }
};

const getSingleCategory = async (req, res) => {
  try {
    const category = await categoryModels.findOne({ slug: req.params.slug });
    return res.status(200).send({
      success: true,
      message: "Single Category has been fetched",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Single Category API",
    });
  }
};

const selectedCategoryController = async (req, res) => {
  try {
    const category = await categoryModels.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      message: "Your selected products has been fetched",
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Selected Product API",
    });
  }
};

const updatedCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const updateCategory = await categoryModels.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Category has been updated",
      updateCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Updated Category API",
    });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModels.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: "Category has been Deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Deleting Category API",
    });
  }
};

module.exports = {
  getCategoryController,
  getSingleCategory,
  selectedCategoryController,
  createCategoryController,
  updatedCategoryController,
  deleteCategoryController,
};
