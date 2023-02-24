const pool = require('../database');

const userDatamapper = {
  async getOneUser(email) {
    // cette requete permet de rechercher un user en fonction de son adresse email
    const preparedQuerry = {
      text: `SELECT 
      "user"."id",
      "user"."email",
      "user"."id_role",
      "user"."password",
      "user"."phone",
      "user"."firstname",
      "user"."lastname", 
      "address"."address",
      "address"."zip_code",
      "address"."city"
      FROM "user"
      JOIN "address" ON "address"."id_user" = "user"."id"
      WHERE "user"."email" = $1`,
      values: [email],
    };
    // j'envoie la querry au fichier database
    const result = await pool.query(preparedQuerry);
    // et renvoie la premiere valeur
    return result.rows[0];
  },
  async putOneUser(user, password) {
    // cette requete permet d'inserer un utilisateur dans la bdd
    const preparedQuerry = {
      text: `INSERT INTO "user"(
        "email",
        "password",
        "phone",
        "firstname",
        "lastname")
        VALUES
      ($1,$2,$3,$4,$5)
      RETURNING id;`,
      values: [user.email, password, user.phone, user.firstname, user.lastname],
    };
    // je demande a la database d'envoie la requete ci-dessus
    const result = await pool.query(preparedQuerry);
    // si touts c'est bien passé, je dois récupérer l'id de l'user qui vient d'être inseré
    return result.rows[0];
  },

  async addAddressFromUserId(address, idUser) {
    // cette requète permet de créer une adresse en fonction d'un id_user
    const preparedQuerry = {
      text: `INSERT INTO "address" 
      ("address", "zip_code", "city", "id_user")
       VALUES 
       ($1,$2,$3,$4);`,
      values: [address.address, address.zip_code, address.city, idUser],
    };
    // je demande a la database d'envoie la requete ci-dessus
    await pool.query(preparedQuerry);
    // si tous est ok je renvoie un code 200
    return 200;
  },

  async updateUser(user, idUser, password) {
    const preparedQuerry = {
      text: `UPDATE "user" SET
      "firstname" = $1,
      "lastname"= $2,
      "phone"=$3,
      "password" = $4
      Where "id"=$5`,
      values: [user.firstname, user.lastname, user.phone, password, idUser],
    };
    // je demande a la database d'envoie la requete ci-dessus
    await pool.query(preparedQuerry);
    // si tous est ok je renvoie un code 200
    return 200;
  },
  async updateUserWithoutPassword(user, idUser) {
    const preparedQuerry = {
      text: `UPDATE "user" SET
      "firstname" = $1,
      "lastname"= $2,
      "phone"= $3
      WHERE "id"=$4`,
      values: [user.firstname, user.lastname, user.phone, idUser],
    };
    // je demande a la database d'envoie la requete ci-dessus
    await pool.query(preparedQuerry);
    // si tous est ok je renvoie un code 200
    return 200;
  },
  async updateAddress(idUser, user) {
    const preparedQuerry = {
      text: `UPDATE "address" SET
      "address" = $1,
      "zip_code"= $2,
      "city"= $3
      WHERE "id_user" = $4 `,
      values: [user.address, user.zip_code, user.city, idUser],
    };
    // je demande a la database d'envoie la requete ci-dessus
    await pool.query(preparedQuerry);
    // si tous est ok je renvoie un code 200
    return 200;
  },

};

module.exports = userDatamapper;
