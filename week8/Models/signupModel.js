const mongoose = require("mongoose");
const registrationSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
  address: String,
  suburb: String,
  postalCode: String,
  password: String,
  type: String,
});

const Registration = mongoose.model("Registration", registrationSchema);

module.exports = {
  Registration,
};
