const express = require("express");
const bodyParser = require("body-parser");
const env = require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
app.use(express.urlencoded({ extended: false }));
const { transactionData } = require("./model");

app.use(express.static("public"));
app.use(bodyParser.json());

const port = process.env.PORT;

// Connecting to database
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.get("/", (req, res) => {
  res.send("index.html");
});

// Add records endpoint
app.post("/addRecord", (req, res) => {
  updateRecordsList(req?.body).then((result) => {
    res.json({
      statusCode: 200,
      data: result,
    });
  });
});

// Get Records per the user endpoint
app.get("/getRecords/:userId", async (req, res) => {
  try {
    const transactionData = await getTransactionRecord(req.params.userId);
    console.log(transactionData);
    res.json({
      statusCode: 200,
      data: transactionData,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get data from the TransactionData document for the given user id
async function getTransactionRecord(userId) {
  let trnRecord;
  try {
    trnRecord = await transactionData.findOne({ userId: userId });
  } catch {
    trnRecord = null;
  }
  return trnRecord;
}

//Update transaction details
async function updateRecordsList(data) {
  const type = data?.type;
  const value = data?.value;
  const note = data?.notes;

  let trnRecord = await getTransactionRecord(data?.userId);
  if (!trnRecord) {
    trnRecord = new transactionData({
      userId: data?.userId,
      recordsList: new Array(),
      incomeTotal: 0,
      expenseTotal: 0,
      balanceTotal: 0,
    });
  }

  if (type === "income") {
    trnRecord.incomeTotal += parseFloat(value);
  } else {
    trnRecord.expenseTotal += parseFloat(value);
  }

  trnRecord.balanceTotal = trnRecord.incomeTotal - trnRecord.expenseTotal;
  trnRecord.recordsList.push([type, value, note]);

  return await trnRecord.save();
}

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
