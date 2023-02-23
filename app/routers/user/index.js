const express = require('express');
const userController = require('../../controllers/user/userController');
const middlewareAuth = require('../../middleware/auth/middlewareAuth');

const router = express.Router();
router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.patch('/modify', middlewareAuth.isLogged);

module.exports = router;
