const userDatamapper = require('../models/datamappers/userDatamapper');

const userServices = {
  async CheckUser(email, password) {
    const user = await userDatamapper.getOneUser(email);
    console.log(user.password);
    return user;
  },

};

module.exports = userServices;
