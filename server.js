const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const Stripe = require('stripe')

dotenv.config();
connectDB();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//Routes

app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/product", require("./routes/productRoutes"));
app.use("/api/v1/category", require("./routes/categoryController"));
app.use("/api/v1/order", require('./routes/order'))

//Home
app.get('/', (req, res) => {
   res.send(200).send({
    success: true,
    mmessage: "Node server is running"
   })
})

const Port = process.env.PORT || 8000;

app.listen(Port, () => console.log(`Server running on ${Port}`));

module.exports = stripe
