const mongoose = require('mongoose');

const customerModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    age: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

const Customer = mongoose.model("Customer", customerModel);
module.exports = Customer;