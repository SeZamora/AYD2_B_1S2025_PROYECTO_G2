const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reportsController');


router.get('/masVendidos', reportsController.masVendidos);
router.get('/ventasMensuales', reportsController.ventasMensuales);
router.get('/ventasPorCategoria', reportsController.ventasPorCategoria); 
module.exports = router;
