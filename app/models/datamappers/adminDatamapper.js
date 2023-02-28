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
             RETURNING id;`,
      values: [product.title, product.description, product.brand, product.price, product.image],
    };
    const idProduct = await client.query(createProduct);
    return idProduct;
  },

  // Update product
  updateProduct: async (productId, updatedProduct) => {
    const updateProduct = {
      text: `UPDATE product
         SET title = $1,
             description = $2,
             brand = $3,
             price = $4,
             image = $5
         WHERE id = $6
         RETURNING *;`,
      values: [updatedProduct.title,
        updatedProduct.description,
        updatedProduct.brand,
        updatedProduct.price,
        updatedProduct.image,
        productId],
    };
    const result = await client.query(updateProduct);
    return result.rows;
  },
};

module.exports = adminDatamapper;
