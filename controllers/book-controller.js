const { BookModel } = require("../models/book-model");
const issuedBook = require("../dtos/book-dto");
exports.getAllBooks = async (req, res) => {
    const books = await BookModel.find();
    if (books.length === 0) {
        return res.status(200).json({
            success: true,
            Message: "No books found"
        });
    }
    return res.status(200).json({
        success: true,
        data: books
    });

};

exports.getOneBookById = async (req, res) => {
    const { id } = req.params;
    const book = await BookModel.findById(id);
    if (!book) {
        return res.status(404).json({
            success: false,
            message: "No books found with that id"
        });
    }
    return res.status(200).json({
        success: true,
        message: "One book found",
        data: book,
    });
};

exports.getAllIssuedBooks = async (req, res) => {
    const users = await UserModel.find({
        issuedBook: { $exists: true },
    }).populate("issuedBook");

    const issuedBooks = users.map((each) => new issuedBook(each));


    if (issuedBooks.length === 0)
        return res.status(404).json({
            success: false,
            message: "No issued Bookd found"
        });
    return res.status(200).json({
        success: true,
        data: issuedBooks
    });

};
