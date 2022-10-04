const express = require('express');
const { getAllBooks, getOneBookById, getAllIssuedBooks } = require('../controllers/book-controller');

const { books } = require('../data/books.json');
const { users } = require('../data/users.json');

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
router.post("/", (req, res) => {
    const data = req.body;
    if (!data) {
        return res.status(400).json({
            success: false,
            message: "No data provided to create book record",
        });
    }
    console.log(data);
    const book = books.find((each) => each.id === data.id);
    if (book) {
        return res.status(404).json({
            success: false,
            message: "Book id already exists"
        });
    } else {
        const allBooks = [...books, data];
        return res.status(201).json({
            success: true,
            message: "One Book added",
            data: allBooks
        });
    }

});

/**
 * Route : /books/:id
 * Method: PUT
 * Description: Update a book
 * Access: Public
 * parameter:id
 * Data: id,author,name,genre,rice,publisher
 */
router.put("/:id", (req, res) => {
    console.log("Put");
    const { id } = req.params;
    const { data } = req.body;

    const book = books.find((each) => each.id === id);
    if (!book) {
        return res.status(400).json({
            success: false,
            message: "Book with that id doesnt exist"
        });
    }
    const updateData = books.map((each) => {
        if (each.id === id) {
            return { ...each, ...data };
        }
        return each;
    })

    return res.status(201).json({
        success: true,
        message: "One Book Updated",
        data: updateData
    });

});




module.exports = router;
