const middlewareCart = require('../../middleware/order/middlewareCart');

const orderController = {
  async createOneOrder(req, res) {
    const userID = req.user.id;
    const cart = req.body;
    console.log(cart);
    try {
      const validateCart = middlewareCart.isvalid(cart);
      console.log(validateCart);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = orderController;
