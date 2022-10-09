const express = require('express');
const dotenv = require("dotenv");
const DbConnection = require("./databaseconnection");
const port = 8081; //http://localhost:8081

//IMporting routes
const userRoute = require('./routes/users.js');
const bookRoute = require('./routes/books.js');
dotenv.config();//running environment variables
const app = express();//using express

DbConnection();//calling database connection function
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: 'server is up'
    });
});


app.use('/users', userRoute);
app.use('/books', bookRoute);

app.get("*", (req, res) => {
    res.status(404).json({
        message: 'This method is not implemented'
    });
});
app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});

