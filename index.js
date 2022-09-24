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

/**
 * Route : /users/:id
 * Method: GET
 * Description: Get all users
 * Access: Public
 * Parameters: id
 */
app.get("/users/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        })
    }
    return res.status(200).json({
        success: true,
        data: user,
    });
});

/**
 * Route : /users
 * Method: POSt
 * Description: Creating new user
 * Access: Public
 * Parameters: None
 */
app.post("/users", (req, res) => {
    const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body;
    const user = users.find((each) => each.id === id);
    if (user) {
        return res.status(404).json({
            success: false,
            message: "Users exists with this id"
        });
    }
    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate
    })
    return res.status(201).json({
        success: true,
        data: users
    });
});

/**
 * Route : /users/:id
 * Method: POSt
 * Description: Creating new user
 * Access: Public
 * Parameters: None
 */
app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { body } = req.params;
    const user = users.find((each) => each.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User Not Found"
        });
    }
    const updateuser = users.map((each) => {
        if (each.id === id) {
            return {

            }
        }
        return each;
    })
    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate
    })
    return res.status(201).json({
        success: true,
        data: users
    });
});



app.get("*", (req, res) => {
    res.status(404).json({
        message: 'This method is not implemented'
    });
});
app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});

