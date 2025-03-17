const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/addProduct', productController.upload.single('imagen'), productController.addProduct);
router.get('/getAllProducts', productController.getAllProducts);
router.post('/getProductByName', productController.getProductById);
router.post('/editProduct', productController.upload.single('imagen'), productController.editProduct);
router.post('/getProductById', productController.getProduct);
router.post('/deleteProduct', productController.deleteProduct);
module.exports = router;
