const express = require('express');
const productController = require('../../controllers/product/productController');

const productRouter = express.Router();

productRouter.get('/products', productController.getAllProducts);

productRouter.get('/products/:id([0-9]+)', productController.productDetails);

module.exports = productRouter;
