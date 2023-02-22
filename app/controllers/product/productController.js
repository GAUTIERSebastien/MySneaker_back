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
  // Hide one product
  async hideProduct(req, res, next) {
    const targetId = Number(req.params.id);
    try {
      const product = await productDatamapper.getOneProductById(targetId);
      if (!product) {
        return res.status(404).json({ error: `Product with ID ${targetId} not found` });
      }
      if (product.hidden) {
        return res.status(400).json({ error: `Product with ID ${targetId} is already hidden` });
      }
      const updatedProduct = await productDatamapper.hide(product);
      return res.json(updatedProduct);
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = productController;
