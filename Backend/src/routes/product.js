const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/addProduct', productController.upload.single('imagen'), productController.addProduct);
router.get('/getAllProducts', productController.getAllProducts);
router.get('/getProductById', productController.getProductById);
module.exports = router;
