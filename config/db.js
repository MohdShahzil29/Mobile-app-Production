const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`DateBase Connected ${mongoose.connection.host}`);
  } catch (error) {}
};

module.exports = connectDB;
