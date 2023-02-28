// const middlewareCart = require('../../middleware/order/middlewareCart');
const orderDatamapper = require('../../models/datamappers/orderDatamapper');

const orderController = {
  async createOneOrder(req, res) {
    const userID = req.user.id;
    const cart = req.body.formatedProducts;
    try {
      const orderId = await orderDatamapper.createOrder(userID);
      for (const product of cart) {
        if (!isNaN(product.id) || !isNaN(product.size) || !isNaN(product.quantity)) {
          await orderDatamapper.createOrderLine(orderId, product);
        }
      }
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = orderController;
