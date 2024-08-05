const mongoose = require("mongoose");

// User Modal Schema
const userSchema = new mongoose.Schema({
  userId: Number,
  name: String,
});

//Transaction Data Schema
const transactionDataSchema = new mongoose.Schema({
  userId: Number,
  incomeTotal: Number,
  expenseTotal: Number,
  balanceTotal: Number,
  recordsList: Array,
});

// Creating model objects
const user = mongoose.model("user", userSchema);
const transactionData = mongoose.model(
  "transactionData",
  transactionDataSchema
);

// Exporting our model objects
module.exports = {
  user,
  transactionData,
};
