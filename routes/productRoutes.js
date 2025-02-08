const express = require('express');
const product = require('../Module/product.module.js');
const { getProducts, createProducts, getProductsById, updateProduct, deleteProduct } = require('../controller/productController.js');
const router = express.Router();

router.get('/', getProducts);
router.post('/', createProducts);
router.get('/:id', getProductsById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;