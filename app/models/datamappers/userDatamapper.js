const client = require('../database');

const userDatamapper = {
  async getOneUser(email) {
    const preparedQuerry = {
      text: 'SELECT * FROM "user" WHERE "email" = $1',
      values: [email],
    };
    const result = await client.query(preparedQuerry);
    return result.rows;
  },
};

module.exports = userDatamapper;
