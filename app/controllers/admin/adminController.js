const adminDatamapper = require('../../models/datamappers/adminDatamapper');

const adminController = {
  // Get all orders
  async getAllOrders(req, res) {
    const allorders = await adminDatamapper.getAllOrders();
    res.json(allorders);
  },

  // Get one product
  async productDetails(req, res) {
    const targetId = Number(req.params.id);
    const foundProduct = await adminDatamapper.getOneProductById(targetId);
    if (!foundProduct) {
      res.status(404).send('Le produit n\'existe pas!');
    }
    res.json(foundProduct);
  },

  // Hide one product
  async hideProduct(req, res, next) {
    const targetId = Number(req.params.id);
    try {
      const product = await adminDatamapper.getOneProductById(targetId);
      if (!product) {
        return res.status(404).json({ error: `Product with ID ${targetId} not found` });
      }
      if (product.hidden) {
        return res.status(400).json({ error: `Product with ID ${targetId} is already hidden` });
      }
      const updatedProduct = await adminDatamapper.hide(product);
      return res.json(updatedProduct);
    } catch (error) {
      return next(error);
    }
  },
  // Create product
  createProduct: async (req, res) => {
    try {
      const product = req.body;
      const createdProduct = await adminDatamapper.create(product);
      res.status(201).json(createdProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to create product' });
    }
  },
};

module.exports = adminController;
