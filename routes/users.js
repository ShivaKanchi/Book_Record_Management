const express = require('express');
const { getAllUsers, getUserById, deleteUser, updateUserById, createUser, getSubscriptionDetailsById } = require('../controllers/user-controller');
const { users } = require('../data/users.json');
const { UserModel, BookModel } = require("../models");
const router = express.Router();

/**
 * Route : /users
 * Method: GET
 * Description: Get all users
 * Access: Public
 * Parameters: None
 */
router.get("/", getAllUsers);

/**
 * Route : /users/:id
 * Method: GET
 * Description: Get all users
 * Access: Public
 * Parameters: id
 */
router.get("/:id", getUserById);

/**
 * Route : /users
 * Method: POSt
 * Description: Creating new user
 * Access: Public
 * Parameters: None
 */
router.post("/", createUser);

/**
 * Route : /users/:id
 * Method: POSt
 * Description: Creating new user
 * Access: Public
 * Parameters: None
 */
router.put("/:id", updateUserById);

/**
 * Route : /users/:id
 * Method: DELETE
 * Description: Delete a user by id
 * Access: Public
 * Parameters: None
 */
router.delete("/:id", deleteUser);

/**
 * Route : /users/subscription-details/:id
 * Method: DELETE
 * Description: Get subscription details of user
 * Access: Public
 * Parameters: None
 */
router.get("/subscription-details/:id", getSubscriptionDetailsById);

module.exports = router;