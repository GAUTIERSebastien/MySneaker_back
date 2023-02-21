const pool = require('../database');

const userDatamapper = {
  async getOneUser(email) {
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
    const result = await pool.query(preparedQuerry);
    return result.rows[0];
  },
  async putOneUser(user, password) {
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

    const result = await pool.query(preparedQuerry);

    return result.rows[0];
  },
  async addAddressFromUserId(address, idUser) {
    const preparedQuerry = {
      text: `INSERT INTO "address" 
      ("address", "zip_code", "city", "id_user")
       VALUES 
       ($1,$2,$3,$4);`,
      values: [address.address, address.zip_code, address.city, idUser],
    };
    await pool.query(preparedQuerry);
    return 200;
  },

};

module.exports = userDatamapper;
