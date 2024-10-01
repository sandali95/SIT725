const mongoose = require('mongoose');
//Note : I removed my credentials since I didn't use an .env file to store the data.
// const mongoURI = 'mongodb+srv://keerthuvije:ZEZS1JlZIvPPwkPe@cluster0.avmbigb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your MongoDB connection string

const bookingSchema = new mongoose.Schema({
    name: String,
    phone: String,
    date: Date,
    time: String
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = {
    Booking,
    
};