const mongoose = require("mongoose");

// User Modal Schema
const userSchema = new mongoose.Schema({
  userId: Number,
  name: String,
});

const user = mongoose.model("user", userSchema);

module.exports = {
  user,
};
