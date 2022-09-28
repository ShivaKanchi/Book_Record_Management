const express = require('express');

const { books } = require('../data/books.json');
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


module.exports = router;
