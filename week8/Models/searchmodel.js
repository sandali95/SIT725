// bookingmodel.js
const mongoose = require('mongoose');

const searchschema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    address: String,
    suburb: String,
    postalCode: String,
    password: String,
}, {
    collection: 'walkers'
});

const Search = mongoose.model('Search', searchschema);

module.exports = {
    Search
};