const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userDatamapper = require('../models/datamappers/userDatamapper');
const config = require('../../configJwt');

const userServices = {
  async CheckUser(email, password) {
    // l'email n'est pas au bon format alors je modifie le code erreur et le renvoie
    if (!emailValidator.validate(email)) {
      return 400;
    }
    // sinon je cherche l'user dans la bdd en fonction de l'email qui m'a etais fourni
    const user = await userDatamapper.getOneUser(email);
    // si je n'est pas d'email alors je renvoie le code d'erreur
    if (!user) {
      return 401;
    }
    // je compare le mot de passe avec bcrypt et celui stocker en bdd qui est crypté
    const isMatchingPassword = await bcrypt.compare(password, user.password);
    // si ça matche alors je supprime le mot de passe du json et le renvoie au controler
    if (isMatchingPassword) {
      Reflect.deleteProperty(user, 'password');
      const token = jwt.sign({
        email: user.email,
        id_role: user.id_role,
        phone: user.phone,
        firstname: user.firstname,
        lastname: user.lastname,
        address: user.address,
        zip_code: user.zip_code,
        city: user.city,
      }, config.jwtSecret, { expiresIn: '1h' });

      return token;
    }
    // sinon je renvoie erreur 401 au controller
    return 401;
  },

};

module.exports = userServices;
