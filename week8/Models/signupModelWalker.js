const mongoose = require("mongoose");
const walkerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
  idProof: String,
  document_number: String,
  idUpload: String,
  certification: String,
  otherCertification: String,
  address: String,
  suburb: String,
  postalCode: String,
  services: [],
  password: String,
  type: String,
});
const Walker = mongoose.model("Walker", walkerSchema);

module.exports = {
  Walker,
};
