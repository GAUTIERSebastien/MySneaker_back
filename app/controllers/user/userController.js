require('dotenv').config();
const jwt = require('jsonwebtoken');
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
      console.log(user);
      const token = jwt.sign({
        id: user.id,
      }, process.env.SECRET_JWT, { expiresIn: '1h' });
      res.json({
        logged: true,
        email: user.email,
        id_role: user.id_role,
        phone: user.phone,
        firstname: user.firstname,
        lastname: user.lastname,
        address: user.address,
        zip_code: user.zip_code,
        city: user.city,
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('erreur lié a la bdd');
    }
  },
};

module.exports = userController;
