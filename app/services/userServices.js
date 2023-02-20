const userDatamapper = require('../models/datamappers/userDatamapper');

const userServices = {
  async CheckUser(email, password, res) {
    const user = await userDatamapper.getOneUser(email);
    if (!user) {
      const error = "l'utilisateur n'existe pas";
      console.log('<< 401 UNAUTHORIZED');
      return res.sendStatus(401);
    }
    if (password === user.password) {
      Reflect.deleteProperty(user, 'password');
      return user;
    }
    const error = "le mot de passe n'est pas correct";
    return error;
  },

};

module.exports = userServices;
