const slugify = require("slugify");
const productModels = require("../model/productModels");
const orderModel = require("../model/orderModel")
const fs = require('fs')

const createProductController = async (req, res) => {
  const { name, description, price, category, quantity, shipping } = req.body;

  const { image: photo } = req.files;

  try {
    // Validation
    if (!name || !description || !price || !quantity || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (photo && photo.size > 1000000) {
      // Note the size in bytes (1MB = 1000000 bytes)
      return res.status(400).json({ error: "Photo should be less than 1MB" });
    }

    const products = new productModels({
      name,
      description,
      price,
      category,
      quantity,
      photo,
      // postedBy: req.auth._id
    });

    if (photo) {
      console.log("Photo Size:", photo.size);
  console.log("Photo Path:", photo.path);
  console.log("Photo Type:", photo.type);
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();

    res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      product: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Creating Products API",
      error,
    });
  }
};


const getAllProductsController = async (req, res) => {
  try {
    const products = await productModels.find({});
    return res.status(200).send({
      success: true,
      message: "All Product has been fetched",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error to getting all products",
      error,
    });
  }
};

const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;

    const products = await productModels
      .find({})
      .select("-photo")
      
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "Product has been listed",
      products,
    });
    console.log(products);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Page Controller",
      error,
    });
  }
};

const productPhotoController = async (req, res) => {
  try {
    const products = await productModels
      .findById(req.params.pid)
      .select("photo");
    if (products.photo.data) {
      res.set("Content-type", products.photo.contentType);
      res.status(200).send(products.photo.data);
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Product Photo API",
    });
  }
};

const getSingleProductController = async (req, res) => {
  try {
    const products = await productModels
      .findOne({ slug: req.params.slug })
      .select("-photo");
    // .populate("category")

    res.status(200).send({
      success: true,
      message: "Single product has been fetched",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error to Getting Single Products",
    });
  }
};

const productCountController = async (req, res) => {
  try {
    const totalCount = await productModels.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      message: "More Product has been loaded",
      totalCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Product loading API",
    });
  }
};

const getUserPostController = async (req, res) => {
  try {
    const userProducts = await productModels.find({postedBy: req.auth._id})
    return res.status(200).send({
      success: true,
      message: 'User Post List',
      userProducts
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success: false,
      message: 'Problem while getting user post'
    })
  }
}
const getSearchController = async (req, res) => {
  try {
    const {keyword} = req.params
    const result = await productModels.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    })
    .select("-photo");
  res.json(result);
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success: false,
      message: 'Error while searching'
    })
  }
}

module.exports = {
  productListController,
  productPhotoController,
  getSingleProductController,
  productCountController,
  createProductController,
  getAllProductsController,
  getUserPostController, 
  getSearchController
};
