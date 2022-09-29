const express = require('express');

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
router.get('/', (req, res) => {
    return res.status(200).json({
        success: true,
        data: books
    });
})


/**
 * Route : /books/:id
 * Method: GET
 * Description: Get all users
 * Access: Public
 * Parameters: id
 */
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const book = books.find((each) => each.id === id);
    if (!book) {
        return res.status(404).json({
            success: false,
            message: "No books found"
        })
    }
    return res.status(200).json({
        success: true,
        data: book,
    });
});

/**
 * Route : /books
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Parameters: id
 */
router.get("/issued/books", (req, res) => {
    const userWithIssuedBook = users.filter((each) => {
        if (each.issuedBook) return each;
    });
    const issuedBooks = [];
    userWithIssuedBook.forEach((each) => {
        const book = books.find((book) => book.id === each.issuedBook);
        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;
        issuedBooks.push(book);
    });

    if (issuedBooks.length === 0)
        return res.status(404).json({
            success: false,
            message: "No issued Bookd found"
        });
    return res.status(200).json({
        success: true,
        data: issuedBooks
    });

});

/**
 * Route : /books
 * Method: POST
 * Description: Create new book
 * Access: Public
 * Parameters: id,author,name,genre,rice,publisher
 */
router.post("/", (req, res) => {
    const data = req.body;
    if (!data) {
        return res.status(404).json({
            success: false,
            message: "No data provided to create book record"
        });
    }
    const book = books.find((each) => { each.id === data.id })
    if (book) {
        return res.status(404).json({
            success: false,
            message: "Book id already exists"
        });
    }
    const allBooks = [...books, data];
    return res.status(201).json({
        success: true,
        data: allBooks
    });
});




module.exports = router;
