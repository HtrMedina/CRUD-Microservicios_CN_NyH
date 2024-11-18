const mongoose = require('mongoose');

const bookModel = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, 
    author: {
        type: String,
        required: true
    },
    numberPages: {
        type: Number,
        required: false
    },
    publisher: {
        type: String,
        required: false
    }
});

const Books = mongoose.model("Books", bookModel);
module.exports = Books;