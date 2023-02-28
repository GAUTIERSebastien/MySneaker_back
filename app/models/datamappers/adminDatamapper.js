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
    const insertSizeAndProduct = {
      text: `INSERT INTO size_to_product (id_size, id_product)
      VALUES (
        (SELECT id FROM size WHERE label = $1),
        (SELECT id FROM product ORDER BY created_at DESC LIMIT 1)
      );`,
      values: [product.size],
    };
    await client.query(createProduct);
    await client.query(insertSizeAndProduct);

    const sizeAndProductInJoin = {
      text: `SELECT product.*, size.*
             FROM product
             JOIN size_to_product ON product.id = size_to_product.id_product
             JOIN size ON size.id = size_to_product.id_size
             WHERE product.id = (SELECT id FROM product ORDER BY created_at DESC LIMIT 1);`,
    };
    const result = await client.query(sizeAndProductInJoin);

    return result.rows[0];
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
    const deleteSizesForProduct = {
      text: `DELETE FROM size_to_product
         WHERE id_product = $1;`,
      values: [productId],
    };
    await client.query(updateProduct);
    await client.query(deleteSizesForProduct);

    const insertSizeAndProductQueries = updatedProduct.sizes.map((size) => ({
      text: `INSERT INTO size_to_product (id_size, id_product)
           VALUES (
             (SELECT id FROM size WHERE label = $1),
             $2
           );`,
      values: [size, productId],
    }));
    await Promise.all(insertSizeAndProductQueries.map((query) => client.query(query)));

    const productWithSizes = {
      text: `SELECT product.*, size.label AS size_label
         FROM product
         JOIN size_to_product ON product.id = size_to_product.id_product
         JOIN size ON size.id = size_to_product.id_size
         WHERE product.id = $1;`,
      values: [productId],
    };
    const result = await client.query(productWithSizes);

    return result.rows;
  },

};

module.exports = adminDatamapper;
