const express = require('express');
const orderController = require('../../controllers/order/orderController');
const middlewareAuth = require('../../middleware/auth/middlewareAuth');

const router = express.Router();

router.post('/', middlewareAuth.isLogged, orderController.createOneOrder);

module.exports = router;
