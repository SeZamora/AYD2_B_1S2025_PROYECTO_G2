const express = require('express');
const router = express.Router();
const billController = require('../controllers/billController');


router.post('/addBill', billController.addBill);
router.get('/bills', billController.getAllBills);
router.post('/getBillById', billController.getBillById); 

module.exports = router;
