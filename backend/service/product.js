const Product = require('../model/product');

class ProductService {
  constructor(connection) {
    this.connection = connection;
  }

  async createProduct(productDate) {
    return await Product.createProduct(productDate, this.connection);
  }

  async getAllProducts() {
    return await Product.getAllProducts(this.connection);
}

}

module.exports = ProductService;
