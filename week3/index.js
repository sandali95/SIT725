const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());

const port = 3000;

const recordsList = new Array();
let expenseTotal = 0;
let incomeTotal = 0;
let balanceTotal = 0;

app.get("/", (req, res) => {
  res.send("index.html");
});

app.post("/addRecord", (req, res) => {
  const type = req.body?.type;
  const value = req.body?.value;
  const note = req.body?.notes;
  if (type === "income") {
    incomeTotal += parseFloat(value);
  } else {
    expenseTotal += parseFloat(value);
  }

  balanceTotal = incomeTotal - expenseTotal;
  recordsList.push([type, value, note]);

  res.json({
    statusCode: 200,
    data: {
      balance: balanceTotal,
      income: incomeTotal,
      expense: expenseTotal,
      recordsList: recordsList,
    },
  });
});

app.get("/getRecords", (req, res) => {
  res.json({
    statusCode: 200,
    data: {
      balance: balanceTotal,
      income: incomeTotal,
      expense: expenseTotal,
      recordsList: recordsList,
    },
  });
});

app.get("/delete", (req, res) => {
  //TBI
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
