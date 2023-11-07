const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
);

const Book =  mongoose.model('Book', bookSchema);

module.exports = Book;