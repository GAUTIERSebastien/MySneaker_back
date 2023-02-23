const productDatamapper = require('../../models/datamappers/productDatamapper');

const productController = {
  async getAllProducts(req, res) {
    const allProducts = await productDatamapper.getAllProducts();
    res.json(allProducts);
  },
  // Get one product
  async productDetails(req, res) {
    const targetId = Number(req.params.id);
    const foundProduct = await productDatamapper.getOneProductById(targetId);
    if (!foundProduct) {
      res.status(404).send('Le produit n\'existe pas!');
    }
    res.json(foundProduct);
  },
};

module.exports = productController;
