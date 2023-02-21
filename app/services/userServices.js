const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');

const userDatamapper = require('../models/datamappers/userDatamapper');

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

      return user;
    }
    // sinon je renvoie erreur 401 au controller
    return 401;
  },

};

module.exports = userServices;
