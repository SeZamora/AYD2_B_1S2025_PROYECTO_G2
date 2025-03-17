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
module.exports = router;
