const express = require('express');
const userRouter = require('./user');
const adminRouter = require('./admin');
const productRouter = require('./product');

const router = express.Router();

router.use('/user', userRouter);
router.use('/admin', adminRouter);
router.use('/product', productRouter);

module.exports = router;
