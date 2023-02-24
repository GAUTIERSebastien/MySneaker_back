const express = require('express');
const adminController = require('../../controllers/admin/adminController');
const middlewareAuth= require('../../middleware/auth/middlewareAuth')
const adminRouter = express.Router();

//route pour créer un produit
adminRouter.post('/products',middlewareAuth.isLogged,middlewareAuth.isAdmin, adminController.createProduct);

//route pour modifier un produit
adminRouter.post('/admin/products/:id',middlewareAuth.isLogged,middlewareAuth.isAdmin, adminController.hideProduct);

module.exports = adminRouter;
