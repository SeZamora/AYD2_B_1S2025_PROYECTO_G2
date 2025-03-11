const express = require('express');
const router = express.Router();
const dbController = require('../controllers/dbController');


router.get('/dbtest', dbController.testdb);

module.exports = router;
