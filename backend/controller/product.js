const ProductService = require('../service/product');
const connection = require('../databaseconfig/db');
const productService = new ProductService(connection);

const productController = {
  async createProduct(req, res) {
    const { image_base64, title, whatsapp, price } = req.body;

    try {
      const productId = await productService.createProduct({
        title,
        image_base64,
        whatsapp,
        price
      });

      return res.status(200).json({
        success: true,
        message: 'Produto criado com sucesso',
        data: { productId },
        meta: { timestamp: new Date().toISOString() }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Erro ao criar produto',
        error: error.message
      });
    }
  },

  async getAllProducts(req, res) {
    try {
      const products = await productService.getAllProducts();

      return res.status(200).json({
        success: true,
        data: products,
        meta: { timestamp: new Date().toISOString() }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Erro ao listar produtos',
        error: error.message
      });
    }
  }
};

module.exports = productController;
