const client = require('../database');

// Get all products
const productDatamapper = {
  async getAllProducts() {
    const renderAllProducts = {
      text: 'SELECT * FROM "product"',
    };
    const result = await client.query(renderAllProducts);
    return result.rows;
  },

  // Get one product
  getOneProductById: async (targetId) => {
    const preparedQuery = {
      text: 'SELECT * FROM "product" WHERE "id" = $1',
      values: [targetId],
    };
    const result = await client.query(preparedQuery);

    // Return the product if it exists
    if (result.rows.length === 1) {
      return result.rows[0];
    }
    // If the product does not exist
    return null;
  },

  // Hide one product
  async hide(product) {
    const query = {
      text: 'UPDATE "product" SET "hidden" = true WHERE id = $1 RETURNING *',
      values: [product.id],
    };
    const rows = await client.query(query);
    return rows[0];
  },
};
module.exports = productDatamapper;
