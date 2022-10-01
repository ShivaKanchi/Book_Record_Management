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
            message: "No books found with that id"
        })
    }
    return res.status(200).json({
        success: true,
        message: "One book found",
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
