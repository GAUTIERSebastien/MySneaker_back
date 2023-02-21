const express = require('express');
const userController = require('../../controllers/user/userController');

const router = express.Router();
router.post('/login', userController.login);
router.post('/signup', userController.signup);

module.exports = router;
