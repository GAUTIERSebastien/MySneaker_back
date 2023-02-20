const client = require('../database');

const productDatamapper = {
  async getAllProducts() {
    const renderAllProducts = {
      text: 'SELECT * FROM "product"',
    };
    const result = await client.query(renderAllProducts);
    return result.rows;
  },
};

module.exports = productDatamapper;
