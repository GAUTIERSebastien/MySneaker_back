const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const userDatamapper = require('../models/datamappers/userDatamapper');

const userServices = {
  async CheckUser(email, password) {
    // je prépare une variable en cas d'erreur
    let error = 401;
    // si l'email n'est pas au bon format alors je modifie le code erreur et le renvoie au controlleur
    if (!emailValidator.validate(email)) {
      error = 400;
      return error;
    }
    // sinon je cherche l'user dans la bdd en fonction de l'email qui m'a etais fourni
    const user = await userDatamapper.getOneUser(email);
    // si je n'est pas d'email alors je renvoie le code d'erreur
    if (!user) {
      return error;
    }
    // je compare le mot de passe avec bcrypt et celui stocker en bdd qui est crypté
    const isMatchingPassword = await bcrypt.compare(password, user.password);
    // si ça matche alors je supprime le mot de passe du json et le renvoie au controler
    if (isMatchingPassword) {
      Reflect.deleteProperty(user, 'password');
      return user;
    }
    // sinon je renvoie erreur 401 au controller
    return error;
  },

};

module.exports = userServices;
