const express = require('express');
const productController = require('../../controllers/product/productController');

const productRouter = express.Router();

productRouter.get('/products', productController.getAllProducts);

module.exports = productRouter;
