const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const productController = require('../controller/product');

router.post('/register', userController.createUser)
router.post('/login', userController.login)

router.post('/product', productController.createProduct)
router.get('/products', productController.getAllProducts);

module.exports = router;
