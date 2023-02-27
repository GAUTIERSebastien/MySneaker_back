const express = require('express');
const userController = require('../../controllers/user/userController');
const middlewareAuth = require('../../middleware/auth/middlewareAuth');

const router = express.Router();

// route pour la connexion au site
router.post('/login', userController.login);

// route pour la création d'un compte
router.post('/signup', userController.signup);

// route pour modify un profil
router.patch('/', middlewareAuth.isLogged, userController.modify);

module.exports = router;
