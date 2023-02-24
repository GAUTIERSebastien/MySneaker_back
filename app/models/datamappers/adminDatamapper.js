const client = require('../database');

const adminDatamapper = {
  // Get all orders
  async getAllOrders() {
    const renderAllOrders = {
      text: 'SELECT * FROM "order"',
    };
    const result = await client.query(renderAllOrders);
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

  // Create  product
  create: async (product) => {
    const createProduct = {
      text: `INSERT INTO product (title, description, brand, price, image)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *;`,
      values: [product.title, product.description, product.brand, product.price, product.image],
    };
    const insertSize = {
      text: `INSERT INTO size_to_product (id_size, id_product)
      VALUES (
        (SELECT id FROM size WHERE label = $1),
        (SELECT id FROM product ORDER BY created_at DESC LIMIT 1),
      );`,
      values: [product.size],
    }; 
    const insertProductAndSize = {
      text: `SELECT product.*, size.*
             FROM product
             JOIN size_to_product ON product.id = size_to_product.id_product
             JOIN size ON size.id = size_to_product.id_size
             WHERE product.id = (SELECT id FROM product ORDER BY created_at DESC LIMIT 1);`
    }; 
    const result = await client.query(createProduct,insertSize,insertProductAndSize);
    return result.rows[0];
  },
};

module.exports = adminDatamapper;
