const { UserModel, BookModel } = require("../models");

exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find();
    if (users.length === 0) {
        return res.status(404).json({
            success: false,
            message: "Users not found"
        })
    }
    return res.status(200).json({
        success: true,
        data: users,
    });
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    const users = await UserModel.findById(id);
    if (users.length === 0) {
        return res.status(404).json({
            success: false,
            message: "Users not found"
        })
    }
    return res.status(200).json({
        success: true,
        data: users,
    });
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await UserModel.deleteOne({
        _id: id
    });
    return res.status(202).json({
        success: true,
        message: "Deleted a user",
        data: users,
    });
};

exports.updateUserById = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    const updateuser = await UserModel.findOneAndUpdate(
        {
            _id: id,
        },
        {
            $set: {
                ...data
            }
        },
        {
            new: true
        });
    return res.status(200).json({
        success: true,
        message: "One user updated",
        data: updateuser
    });
};

exports.createUser = async (req, res) => {
    const { data } = req.body;
    const user = await UserModel.create({
        ...data
    });
    return res.status(201).json({
        success: true,
        data: user
    });
};

exports.getSubscriptionDetailsById = async (req, res) => {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (!user) {
        res.status(404).json({
            success: false,
            message: "User not found"
        })
    }

    const getDateInDays = (data = "") => {
        let date;
        if (data === "") {
            date = new Date();
        } else {
            date = new Date(data);
        }
        let days = Math.floor(date / 1000 * 60 * 60 * 24);
        return days;
    };

    const subscriptionType = (date = "") => {
        if (user.subscriptionType === "Basic") {
            date = date + 90;
        } else if (user.subscriptionType === "Standard") {
            date = date + 180;
        } else if (user.subscriptionType === "Premium") {
            date = date + 365;
        }
        return date;
    };

    ///jan 1 1976,UTC in miliseconds
    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiry = subscriptionType(subscriptionDate);

    const data = {
        ...user,
        subscriptionExpired: subscriptionExpiry > currentDate,
        daysLeftForExpiry:
            subscriptionExpiry <= currentDate ? 0 : subscriptionExpiry - currentDate,
        fine:
            returnDate < currentDate ? subscriptionExpiry <= currentDate ? 200 : 100 : 0,

    };
    res.status(200).json({
        success: true,
        data
    });
};
