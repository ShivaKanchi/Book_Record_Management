const express = require('express');
const dotenv = require("dotenv");
dotenv.config();//running environment variables
const DbConnection = require("./databaseconnection");
const port = 8081; //http://localhost:8081

//IMporting routes
const userRoute = require('./routes/users.js');
const bookRoute = require('./routes/books.js');

//Data Import from data folder
const { users } = require('./data/users.json');
const { books } = require('./data/books.json');

//Model import


const app = express();//using express
DbConnection();//calling database connection function

app.use(express.json());
app.get("/", (req, res) => {
    res.status(200).json({
        message: 'server is up'
    });
});


app.use('/users', userRoute)
app.use('/books', bookRoute)

app.get("*", (req, res) => {
    res.status(404).json({
        message: 'This method is not implemented'
    });
});
app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});

