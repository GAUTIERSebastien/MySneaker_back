const express = require('express');
const productController = require('../../controllers/product/productController');

const productRouter = express.Router();

// route pour avoir tous les produits
productRouter.get('/products', productController.getAllProducts);

// route pour avoir un produit spécifique en fonction de son id
productRouter.get('/products/:id([0-9]+)', productController.productDetails);

module.exports = productRouter;
