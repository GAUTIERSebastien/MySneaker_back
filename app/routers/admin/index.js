const express = require('express');
const adminController = require('../../controllers/admin/adminController');
const middlewareAuth = require('../../middleware/auth/middlewareAuth');

const adminRouter = express.Router();

// route pour créer un produit
adminRouter.post('/products', middlewareAuth.isLogged, middlewareAuth.isAdmin, adminController.createProduct);

// route pour caché un produit
adminRouter.patch('/products/:id([0-9]+)', middlewareAuth.isLogged, middlewareAuth.isAdmin, adminController.hideProduct);

// route pour modifier un produit
adminRouter.patch('/products/update/:id', middlewareAuth.isLogged, middlewareAuth.isAdmin, adminController.updateProduct);

// route pour afficher les commandes
adminRouter.get('/order', middlewareAuth.isLogged, middlewareAuth.isAdmin, adminController.getAllOrder);

// route pour afficher une commande
adminRouter.get('/order/:id', middlewareAuth.isLogged, middlewareAuth.isAdmin, adminController.getOneOrder);

module.exports = adminRouter;
