const express = require('express');
const app = express();
const port = 8081; //http://localhost:8081
//Data Import from data folder
const { users } = require('./data/users.json');
const { books } = require('./data/books.json');

app.use(express.json());
app.get("/", (req, res) => {
    res.status(200).json({
        message: 'server is up'
    });
});
app.get("*", (req, res) => {
    res.status(404).json({
        message: 'This method is not implemented'
    });
    app.listen(port, () => {
        console.log(`Server started at port ${port}`);
    });
});

/**
 * Route : /users
 * Method: GET
 * Description: Get all users
 * Access: Public
 * Parameters: None
 */

app.get("/users", (req, res) => {
    res.status(200).json({
        success: true,
        data: users
    });
});
