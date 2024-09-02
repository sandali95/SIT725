const mongoose = require("mongoose");

//Transaction Data Schema
const transactionDataSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  incomeTotal: {
    type: Number,
  },
  expenseTotal: {
    type: Number,
  },
  balanceTotal: {
    type: Number,
  },
  recordsList: {
    type: Array,
  },
});

// Creating model objects
const transactionData = mongoose.model(
  "transactionData",
  transactionDataSchema
);

// Find records by user id
const findRecordByUserId = (userId) => {
  return transactionData.findOne({ userId: userId });
};

//Add a record into records list and update the totals
const addRecordAndAdjustValues = async (userId, recordToAdd) => {
  return await transactionData.updateOne(
    { userId: userId },
    {
      $push: { recordsList: recordToAdd },
      $inc: {
        incomeTotal: recordToAdd.type === "income" ? recordToAdd.value : 0,
        expenseTotal: recordToAdd.type === "expense" ? recordToAdd.value : 0,
        balanceTotal:
          recordToAdd.type === "income"
            ? recordToAdd.value
            : -recordToAdd.value,
      },
    }
  );
};

//Remove a record from the record list and update the totals
const removeRecordAndAdjustTotals = async (userId, recordToRemove) => {
  const tr = await transactionData.updateOne(
    { userId: userId },
    {
      $pull: { recordsList: recordToRemove },
      $inc: {
        incomeTotal:
          recordToRemove.type === "income" ? -recordToRemove.value : 0,
        expenseTotal:
          recordToRemove.type === "expense" ? -recordToRemove.value : 0,
        balanceTotal:
          recordToRemove.type === "income"
            ? -recordToRemove.value
            : recordToRemove.value,
      },
    }
  );
  return tr;
};

module.exports = {
  findRecordByUserId,
  removeRecordAndAdjustTotals,
  addRecordAndAdjustValues,
};
