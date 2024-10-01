const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // This loads the .env file

const connectDB = async () => {
    try {
      const dbURI = process.env.MONGODB_URI; // Ensure this variable is set in your .env file
      if (!dbURI) {
        throw new Error('MongoDB URI is not defined in the environment variables');
      }
      await mongoose.connect(dbURI); // Remove deprecated options
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error; // Re-throw to handle in server.js
    }
  };  

module.exports = { connectDB };
