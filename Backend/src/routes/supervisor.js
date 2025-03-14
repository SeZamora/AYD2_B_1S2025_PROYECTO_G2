const express = require('express');
const router = express.Router();
const superVisorController = require('../controllers/superVisorController');

router.post('/addSupervisor', superVisorController.createSupervisor);
router.post('/editSupervisor', superVisorController.editInfo);
router.post('/getSupervisorById', superVisorController.getSupervisorById);
router.get('/getAllSupervisor', superVisorController.getAllSupervisors);
module.exports = router;
