const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
require('dotenv').config();

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
  async CheckUserAndAdd(user) {
    // je vérifie si l'email est au bon format
    if (!emailValidator.validate(user.email)) {
      return 400;
    }
    // je vérifie si les 2 champs email correcpondent et les mot de passe
    if (user.email !== user.confirmEmail || user.password !== user.confirmPassword) {
      return 400;
    }
    // je vérifie si champs zip_code et phone sont bien des chiffre
    if (isNaN(user.zip_code) || isNaN(user.phone)) {
      return 400;
    }
    const saltRounds = parseInt(process.env.SALTROUND, 10);
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    const idUser = await userDatamapper.putOneUser(user, hashedPassword);
    // console.log(idUser);
    if (!idUser) {
      return 400;
    }
    // const formatedId = parseInt(idUser.id, 10);
    const address = await userDatamapper.addAddressFromUserId(user, idUser.id);
    if (!address) {
      return 400;
    }
    return 200;
  },
};

module.exports = userServices;
