const { BookModel, UserModel } = require("../models");
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
