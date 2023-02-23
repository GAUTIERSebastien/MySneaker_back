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
        id_role: user.id_role,
      }, process.env.SECRET_JWT, { expiresIn: '1h' });
      res.json({
        email: user.email,
        phone: user.phone,
        firstname: user.firstname,
        lastname: user.lastname,
        address: user.address,
        zip_code: user.zip_code,
        city: user.city,
        id_role: user.id_role,
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('erreur lié a la bdd');
    }
  },
  // méthode pour création utilisateur
  signup: async (req, res) => {
    // je récupère les infos envoyé par le front
    const newUser = req.body;
    const result = await userServices.CheckUserAndAdd(newUser);
    if (result === 200) {
      res.status(200).send('l\'utilisateur est bien enregistré');
    } else {
      res.status(400).send('les données saisie sont incorrect');
    }
  },
  // méthode pour modifier le profil
  modify: async (req, res) => {
    // récupération des infos de modification de l'user
    const user = req.body;
    // récupération de l'id de l'user
    const idUser = req.user.id;
    const result = userServices.modifyUser(user, idUser);
    if (result === 404) {
      res.status(404).send('cette utilisateur n\'existe pas');
    }
  },
};

module.exports = userController;
