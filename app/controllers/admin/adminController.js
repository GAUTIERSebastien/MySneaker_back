const adminDatamapper = require('../../models/datamappers/adminDatamapper');

const adminController = {

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
};

module.exports = adminController;
