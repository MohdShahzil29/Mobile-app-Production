const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);
