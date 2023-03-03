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
    if (user.hidden === true) {
      return 402;
    }
    // je compare le mot de passe avec bcrypt et celui stocker en bdd qui est crypté
    const isMatchingPassword = await bcrypt.compare(password, user.password);
    // si ça matche alors je supprime le mot de passe du json et le renvoie au controler
    if (isMatchingPassword) {
      Reflect.deleteProperty(user, 'password');
      // et je renvoie les info de l'user
      return user;
    }
    // sinon je renvoie erreur 401 au controller
    return 401;
  },
  async CheckUserAndAdd(user) {
    // je vérifie si l'email est au bon format si il ne l'ai pas je renvoie un codee 400
    if (!emailValidator.validate(user.email.toLowerCase())) {
      return 400;
    }
    // je vérifie si les 2 champs email correcpondent et les mot de passe si il ne correspondent pas je renvoie un code 400
    if (user.email !== user.confirmEmail || user.password !== user.confirmPassword) {
      return 400;
    }
    // je vérifie si champs zip_code et phone sont bien des chiffre si ce n'est pas le cas je renvoie un code 400
    if (isNaN(user.zip_code) || isNaN(user.phone)) {
      return 400;
    }
    // je transforme le saltRound en chiffre
    const saltRounds = parseInt(process.env.SALTROUND, 10);
    // je hash le mot de passe reçu
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    // et je push dans la bdd
    const idUser = await userDatamapper.putOneUser(user, hashedPassword);

    // a la suite de ce push je doit récupérer l'id de l'user créer si ce n'est pas le cas je revois au controller un code 400
    if (!idUser) {
      return 400;
    }
    // grace a l'id de l'user , je peux renseigner son adresse
    const address = await userDatamapper.addAddressFromUserId(user, idUser.id);
    // si je ne reçois rien, je renvoi un code 400
    if (!address) {
      return 400;
    }
    // sinon je renvoie un code 200
    return 200;
  },

  // méthode pour vérifier et modifié l'utilisateur
  async modifyUser(newInfoUser, idUser) {
    console.log(newInfoUser);

    if (isNaN(newInfoUser.zip_code) || isNaN(newInfoUser.phone)) {
      return 400;
    }

    if (!newInfoUser.password || newInfoUser.password.length == 0) {
      await userDatamapper.updateUserWithoutPassword(newInfoUser, idUser);
      await userDatamapper.updateAddress(idUser, newInfoUser);
    } else {
      if (newInfoUser.password !== newInfoUser.confirmPassword) {
        return 400;
      }
      const saltRounds = parseInt(process.env.SALTROUND, 10);
      const hashedPassword = await bcrypt.hash(newInfoUser.password, saltRounds);
      await userDatamapper.updateUser(newInfoUser, idUser, hashedPassword);
      await userDatamapper.updateAddress(idUser, newInfoUser);
      return 200;
    }
  },
  async delete(idUser) {
    const result = await userDatamapper.deleteUser(idUser);
    return result;
  },
};

module.exports = userServices;
