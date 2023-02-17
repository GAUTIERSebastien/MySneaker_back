const userDatamapper = require('../../models/datamappers/userDatamapper');
const userServices = require('../../services/userServices');

const userController = {
  // méthode qui permet de vérifier si l'user est bien dans la bdd
  login: async (req, res) => {
    try {
      // je récupère l'email et le mot de passe qui a était envoyé
      const { email, password } = req.body;
      const user = await userServices.CheckUser(email, password);
      res.json(user);
    } catch (error) {
      res.render();
    }
  },

};

module.exports = userController;
