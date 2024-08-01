const express = require ('express')
const router = express.Router()
const booksController = require('../controller/booksController')

// Multer setup
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


router.get('/',booksController.getAllBooks);
router.get('/:BookName',booksController.getBooksByName);
router.get('/author/:Author',booksController.getBooksByAuthor);
router.post('/new',upload.single('image'), booksController.createBook);
router.put('/:id',booksController.updateBooks);
router.delete('/:id',booksController.deleteBooks);

module.exports = router;