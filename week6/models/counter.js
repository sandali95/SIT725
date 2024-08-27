const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  _id: String, // This will store the name of the collection or field
  seq: Number, // This will store the current sequence value
});

const counter = mongoose.model("Counter", counterSchema);

const getNextSequence = async (name) => {
  const count = await counter.findByIdAndUpdate(
    { _id: name },
    { $inc: { seq: 1 } }, // Increment the sequence by 1
    { new: true, upsert: true } // Return the updated document, create if doesn't exist
  );

  return count.seq;
};

module.exports = { getNextSequence };
