const productDatamapper = require('../../models/datamappers/productDatamapper');

const productController = {
  async getAllProducts(req, res) {
    const allProducts = await productDatamapper.getAllProducts();
    res.json(allProducts);
  },

};

module.exports = productController;
