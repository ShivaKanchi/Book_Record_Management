const mongooose = require("mongoose");

const Schema = mongooose.Schema;

const bookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})
//Collection will have name books
module.exports = mongoose.model("Book", bookSchema);