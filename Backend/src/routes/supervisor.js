const express = require('express');
const router = express.Router();
const superVisorController = require('../controllers/superVisorController');


router.post('/editSupervisor', superVisorController.editInfo);
module.exports = router;
