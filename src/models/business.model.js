const mongoose = require('mongoose');
const businessSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: {type: String, required: true},
    address: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    description: {type: String},
    });

    const Business = mongoose.model('Businesses', businessSchema);

    module.exports = Business;
