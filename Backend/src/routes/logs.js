const express = require('express');
const router = express.Router();
const logController = require('../controllers/logsController');


router.get('/employee', logController.getAllEmployeeLogs);
router.get('/supervisor', logController.getAllSupervisorLogs);

module.exports = router;
