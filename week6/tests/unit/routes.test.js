const request = require("supertest");
const express = require("express");
const sinon = require("sinon");
const { expect } = require("chai");
const router = require("../../routes/record");
const recordsController = require("../../controllers/recordsController");

const app = express();
app.use(express.json());
app.use("/records", router);

describe("Records API", () => {
  let addRecordStub;
  let getTransactionRecordStub;
  let updateRecordStub;
  let removeRecordStub;

  beforeEach(() => {
    addRecordStub = sinon.stub(recordsController, "addRecordAndAdjustValues");
    getTransactionRecordStub = sinon.stub(
      recordsController,
      "getTransactionRecord"
    );
    updateRecordStub = sinon.stub(
      recordsController,
      "updateRecordAndAdjustValues"
    );
    removeRecordStub = sinon.stub(
      recordsController,
      "removeRecordAndAdjustTotals"
    );
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should return index.html for the root route", (done) => {
    request(app).get("/records/").expect(200).expect("index.html", done);
  });

  describe("POST /addRecords", () => {
    it("should add a record and adjust values", (done) => {
      const mockRecord = {
        userId: 1,
        record: {
          value: 100,
          type: "income",
          note: "New income",
          recordId: 12,
        },
      };
      addRecordStub.resolves(mockRecord);

      request(app)
        .post("/records/addRecord")
        .send(mockRecord)
        .expect("Content-Type", /json/)
        .expect(200)
        .expect((res) => {
          expect(res.body.statusCode).to.equal(201);
          expect(res.body.message).to.equal("Record added and totals adjusted");
          expect(res.body.data).to.deep.equal(mockRecord);
        })
        .end(done);
    });

    it("should return an error when record is invalid", (done) => {
      const errorMessage = "Invalid Data";
      addRecordStub.rejects(new Error(errorMessage));
      request(app)
        .post("/records/addRecord")
        .send({ userId: "1", record: { type: "income", value: null } })
        .expect("Content-Type", /json/)
        .expect(500)
        .expect((res) => {
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("error");
        })
        .end(done);
    });
  });

  describe("GET /getRecords/:userId", () => {
    it("should get records for a user", (done) => {
      const mockRecords = {
        userId: 123,
        expenseTotal: 0,
        incomeTotal: 100,
        balanceTotal: 100,
        recordsList: [
          { value: 100, type: "income", note: "New income", recordId: 1 },
        ],
      };
      getTransactionRecordStub.resolves(mockRecords);

      request(app)
        .get("/records/getRecords/123")
        .expect("Content-Type", /json/)
        .expect(200)
        .expect((res) => {
          expect(res.body.statusCode).to.equal(200);
          expect(res.body.data).to.deep.equal(mockRecords);
        })
        .end(done);
    });

    it("should return an error when user id is invalid", (done) => {
      const errorMessage = "Invalid Data";
      getTransactionRecordStub.rejects(new Error(errorMessage));
      request(app)
        .get("/records/getRecords/invalid")
        .expect("Content-Type", /json/)
        .expect(500)
        .expect((res) => {
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("error");
        })
        .end(done);
    });
  });

  describe("PUT /updateRecord", () => {
    it("should update a record and adjust values", (done) => {
      const updatedRecord = {
        userId: 123,
        record: {
          value: 105,
          type: "income",
          note: " income updated",
          recordId: 1,
        },
      };
      updateRecordStub.resolves(updatedRecord);

      request(app)
        .put("/records/updateRecord")
        .send(updatedRecord)
        .expect("Content-Type", /json/)
        .expect(200)
        .expect((res) => {
          expect(res.body.statusCode).to.equal(200);
          expect(res.body.message).to.equal(
            "Record updated and totals adjusted"
          );
          expect(res.body.data).to.deep.equal(updatedRecord);
        })
        .end(done);
    });

    it("should return an error when data is invalid", (done) => {
      const errorMessage = "Invalid Data";
      updateRecordStub.rejects(new Error(errorMessage));
      request(app)
        .put("/records/updateRecord")
        .send({ userId: "1", record: { type: "income", value: null } })
        .expect("Content-Type", /json/)
        .expect(500)
        .expect((res) => {
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("error");
        })
        .end(done);
    });
  });

  describe("DELETE /deleteRecord/:userId/:recordToRemoveId", () => {
    it("should delete a record and adjust totals", (done) => {
      const deleteResponse = { success: true };
      removeRecordStub.resolves(deleteResponse);

      request(app)
        .delete("/records/deleteRecord/123/456")
        .expect("Content-Type", /json/)
        .expect(200)
        .expect((res) => {
          expect(res.body.statusCode).to.equal(200);
          expect(res.body.message).to.equal(
            "Record removed and totals adjusted"
          );
          expect(res.body.data).to.deep.equal(deleteResponse);
        })
        .end(done);
    });

    it("should return an error when data is invalid", (done) => {
      const errorMessage = "Something went wrong";
      removeRecordStub.rejects(new Error(errorMessage));

      request(app)
        .delete("/records/deleteRecord/123/invalid")
        .expect("Content-Type", /json/)
        .expect(500)
        .expect((res) => {
          expect(res.body).to.be.an("object");
          expect(res.body.error).to.equal(errorMessage);
        })
        .end(done);
    });
  });
});
