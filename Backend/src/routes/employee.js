const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');


router.post('/editEmployee', employeeController.editInfo);
router.post('/addEmployee', employeeController.upload.single('imagen'), employeeController.addEmployee);
router.post('/getEmployee', employeeController.getEmployeeById);
router.get('/getAllEmployee', employeeController.getAllEmployees);
module.exports = router;
