const express = require("express");
const recordsController = require("../controllers/recordsController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("index.html");
});

// Add records endpoint
router.post("/addRecord", async (req, res) => {
  await recordsController
    .addRecordAndAdjustValues(req?.body)
    .then((result) => {
      res.json({
        statusCode: 201,
        message: "Record added and totals adjusted",
        data: result,
      });
    })
    .catch((error) => {
      res.status(error.status || 500).json({ error: error.message });
    });
});

// Get Records per the user endpoint
router.get("/getRecords/:userId", async (req, res) => {
  await recordsController
    .getTransactionRecord(req.params.userId)
    .then((result) => {
      res.json({
        statusCode: 200,
        data: result,
      });
    })
    .catch((error) => {
      res.status(error.status || 500).json({ error: error.message });
    });
});

//Update a given records values
router.put("/updateRecord", async (req, res) => {
  await recordsController
    .updateRecordAndAdjustValues(req.body)
    .then((result) => {
      res.json({
        statusCode: 200,
        message: "Record updated and totals adjusted",
        data: result,
      });
    })
    .catch((error) => {
      res.status(error.status || 500).json({ error: error.message });
    });
});

//delete a record for the given user id
router.delete("/deleteRecord/:userId/:recordToRemoveId", async (req, res) => {
  await recordsController
    .removeRecordAndAdjustTotals(req.params.userId, req.params.recordToRemoveId)
    .then((result) => {
      res.json({
        statusCode: 200,
        message: "Record removed and totals adjusted",
        data: result,
      });
    })
    .catch((error) => {
      res.status(error.status || 500).json({ error: error.message });
    });
});
module.exports = router;
