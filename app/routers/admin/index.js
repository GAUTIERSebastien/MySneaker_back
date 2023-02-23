const express = require('express');
const adminController = require('../../controllers/admin/adminController');

const adminRouter = express.Router();

adminRouter.get('/admin/products/:id', adminController.productDetails);

adminRouter.get('/admin/order', adminController.getAllOrders);

adminRouter.post('/admin/products', adminController.createProduct);

adminRouter.post('/admin/products/:id', adminController.hideProduct);

module.exports = adminRouter;
