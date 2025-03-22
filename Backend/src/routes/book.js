const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');


router.post('/createbook', bookController.addBook);
router.get('/getallbooks', bookController.getAllBooks);
router.post('/getById', bookController.getBookById);
router.post('/updatebook', bookController.updateBook);
router.post('/addResenia', bookController.addResenia);
router.get('/resenias', bookController.getAllResenias);
router.post('/deletebook', bookController.deleteBook);
router.delete('/deleteResenia', bookController.deleteResenia);
router.post('/updateResenia', bookController.updateResenia);
router.get('/topbooks', bookController.topbooks);
router.post('/addDeseo', bookController.addDeseo);
router.get('/getDeseos', bookController.getDeseos);
router.delete('/eliminarDeseo', bookController.eliminarDeseo);
module.exports = router;
