const client = require('../database');

const orderDatamapper = {
  async createOrder(userId) {
    try {
      const preparedQuery = {
        text: `INSERT INTO "order" (id_user)
            VALUE
            ($1)
            RETURNING id;`,
        value: [userId],
      };

      const idOrder = await client.querry(preparedQuery);

      return idOrder;
    } catch (error) {
      return error;
    }
  },

  async createOrderLine(orderId, product) {
    try {
      const preparedQuery = {
        text: `INSERT INTO "order_line" (id_order,id_product,quantity,size)
            VALUE ($1,$2,$3,$4);`,
        value: [orderId, product.id, product.quantity, product.size],
      };
      const result = await client.query(preparedQuery);
      return result;
    } catch (error) {
      return error;
    }
  },
};

module.exports = orderDatamapper;
