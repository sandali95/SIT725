const express = require("express");
const bodyParser = require("body-parser");
const env = require("dotenv").config();
const mongoose = require("mongoose");

const recordRouter = require("./routes/record.js");

const app = express();
app.use(express.urlencoded({ extended: false }));

app.use(express.static("views"));
app.use(bodyParser.json());

app.use("/records", recordRouter);

const port = process.env.PORT;

// Connecting to database
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
