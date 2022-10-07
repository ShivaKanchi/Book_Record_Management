const express = require('express');
const { books } = require('../data/books.json');
const { users } = require('../data/users.json');
const { getAllBooks, getOneBookById, getAllIssuedBooks, addNewBook, updateBookById } = require('../controllers/book-controller');
const router = express.Router();

/**
 * Route : /books
 * Method: GET
 * Description: Get all books
 * Access: Public
 * Parameters: None
 */
router.get('/', getAllBooks);

/**
 * Route : /books/:id
 * Method: GET
 * Description: Get all users
 * Access: Public
 * Parameters: id
 */
router.get("/:id", getOneBookById);

/**
 * Route : /books
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Parameters: id
 */
router.get("/issued/books", getAllIssuedBooks);

/**
 * Route : /books
 * Method: POST
 * Description: Create new book
 * Access: Public
 * parameter:none
 * Data: id,author,name,genre,rice,publisher
 */
router.post("/", addNewBook);

/**
 * Route : /books/:id
 * Method: PUT
 * Description: Update a book
 * Access: Public
 * parameter:id
 * Data: id,author,name,genre,rice,publisher
 */
router.put("/:id", updateBookById);

module.exports = router;
