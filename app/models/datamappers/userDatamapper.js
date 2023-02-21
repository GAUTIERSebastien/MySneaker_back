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

};

module.exports = userDatamapper;
