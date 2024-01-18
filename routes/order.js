const express = require('express')
const { requireSignIn }  = require('./../middlewares/authMiddlewares');
const { createOrderController, getMyOrdersController, singleOrderDetailsController, paymetsController, getAllOrdersController, changeOrderStatusController } = require('../controller/orderController')

const routes = express.Router()

// order
routes.post("/create", createOrderController);
routes.get("/my-orders",  getMyOrdersController);
routes.get("/my-orders/:id", singleOrderDetailsController);
// acceipt payments
routes.post("/payments",  paymetsController);

routes.get("/get-all-orders",   getAllOrdersController);
 
routes.put("/order/:id",  changeOrderStatusController);

module.exports = routes