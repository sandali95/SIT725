const express = require("express");
const bodyParser = require("body-parser");
const env = require("dotenv").config();
const mongoose = require("mongoose");
const socket = require("socket.io");
const http = require("http");

const recordRouter = require("./routes/record.js");

const app = express();
const server = http.createServer(app);
const io = socket(server);
app.use(express.urlencoded({ extended: false }));

app.use(express.static("views"));
app.use(bodyParser.json());

// Socket setup
io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("Transaction", (data) => {
    socket.broadcast.emit("Transaction", {
      message: "User " + data.userId + " has added a " + data.type,
    });
  });
});
app.use("/records", recordRouter);

const port = process.env.PORT;

// Connecting to database
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

server.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
