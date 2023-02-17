const userDatamapper = require('../models/datamappers/userDatamapper');

const userServices = {
  async CheckUser(email, password) {
    const user = await userDatamapper.getOneUser(email);
    if (!user) {
      const error = "l'utilisateur n'existe pas";
      return error;
    }
    if (password === user.password) {
      Reflect.deleteProperty(user, 'password');
      return user;
    }
    error = "le mot de passe n'est pas correct";
    return error;
  },

};

module.exports = userServices;
