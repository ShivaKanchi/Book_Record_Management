const express = require('express');
const { users } = require('../data/users.json');

const router = express.Router();

/**
 * Route : /users
 * Method: GET
 * Description: Get all users
 * Access: Public
 * Parameters: None
 */
router.get("/", (req, res) => {
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
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found by this id"
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
router.post("/", (req, res) => {
    const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body;
    const user = users.find((each) => each.id === id);
    if (user) {
        return res.status(404).json({
            success: false,
            message: "Users already exists with this id"
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
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    const user = users.find((each) => each.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User Not Found to update"
        });
    }
    const updateuser = users.map((each) => {
        if (each.id === id) {
            return {
                ...each,
                ...data
            };
        }
        return each;
    });
    return res.status(200).json({
        success: true,
        data: updateuser
    });
});

/**
 * Route : /users/:id
 * Method: DELETE
 * Description: Delete a user by id
 * Access: Public
 * Parameters: None
 */
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found to delete"
        })
    }
    const index = users.indexOf(user);
    users.splice(index, 1);
    return res.status(202).json({
        success: true,
        data: users,
    });
});

module.exports = router;