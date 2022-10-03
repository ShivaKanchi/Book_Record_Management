const { default: mongoose } = require("mongoose");
const mongooose = require("mongoose");

const Schema = mongooose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    issuedBook: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: false,
    },
    returnDate: {
        type: String,
        required: false
    },
    subscriptionType: {
        type: String,
        required: true
    },
    subscriptionDate: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})
//Collection will have name users
module.exports = mongoose.model("User", bookSchema);