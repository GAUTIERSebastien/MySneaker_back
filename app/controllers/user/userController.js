const userServices = require('../../services/userServices');

const userController = {
  // méthode qui permet de vérifier si l'user est bien dans la bdd
  login: async (req, res) => {
    try {
      // je récupère l'email et le mot de passe qui a était envoyé
      const { email, password } = req.body;
      const user = await userServices.CheckUser(email, password);

      if (user === 401) {
        return res.status(401).send('le nom d\'utilisateur ou le mot de passe ne correspondent pas');
      }
      if (user === 400) {
        return res.status(400).send('le format de l\'email n\'est pas correct');
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).render('erreur lié a la bdd');
    }
  },
};

module.exports = userController;
