const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const recordsController = require("../../controllers/recordsController.js");
const records = require("../../models/record.js");
const counter = require("../../models/counter.js");

describe("Records Controller", () => {
  let sandbox;
  let removeRecordStub;
  let addRecordStub;
  let findRecordStub;
  let getNextSequenceStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    removeRecordStub = sandbox
      .stub(recordsController, "removeRecordAndAdjustTotals")
      .resolves();
    addRecordStub = sandbox
      .stub(records, "addRecordAndAdjustValues")
      .resolves();
    findRecordStub = sandbox.stub(records, "findRecordByUserId");
    getNextSequenceStub = sandbox.stub(counter, "getNextSequence").resolves(1);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("getTransactionRecord", () => {
    it("should return transaction record for valid userId", () => {
      const fakeRecord = { userId: "123", incomeTotal: 200, recordsList: [] };
      findRecordStub.returns(fakeRecord);

      const result = recordsController.getTransactionRecord("123");
      expect(result).to.equal(fakeRecord);
      expect(result.incomeTotal).to.equal(200);
    });

    it("should return null for invalid userId", () => {
      findRecordStub.throws();

      const result = recordsController.getTransactionRecord("999");
      expect(result).to.be.null;
    });
  });

  describe("addRecordAndAdjustValues", () => {
    it("should add a record with an auto-incremented recordId", async () => {
      const fakeData = { userId: "123", record: {} };
      addRecordStub.returns(fakeData);

      const result = await recordsController.addRecordAndAdjustValues(fakeData);
      expect(result.record.recordId).to.equal(1);
    });

    it("should handle errors properly", async () => {
      getNextSequenceStub.rejects(new Error("Error fetching sequence"));

      const fakeData = { userId: "123", record: {} };

      try {
        await recordsController.addRecordAndAdjustValues(fakeData);
      } catch (error) {
        expect(error.message).to.equal("Error fetching sequence");
      }
    });
  });

  describe("updateRecordAndAdjustValues", () => {
    it("should update the record and return the updated record", async () => {
      const fakeData = {
        userId: "123",
        record: { recordId: 1, type: "income", value: 200 },
      };
      const fakeDocument = {
        userId: "123",
        incomeTotal: 100,
        balanceTotal: 0,
        recordsList: [{ recordId: 1, type: "income", value: 100 }],
      };

      addRecordStub.returns(fakeDocument);
      findRecordStub.returns(fakeDocument);

      const result = await recordsController.updateRecordAndAdjustValues(
        fakeData
      );
      expect(result.recordId).to.equal(1);
    });

    it("should handle errors when record is not found", async () => {
      const fakeData = { userId: "123", record: { recordId: 1 } };

      try {
        await recordsController.updateRecordAndAdjustValues(fakeData);
      } catch (error) {
        expect(error.message).to.equal(
          "Transactions not found for the given user id"
        );
      }
    });
  });

  describe("removeRecordAndAdjustTotals", () => {
    it("should remove the specified record and adjust totals", async () => {
      const fakeDocument = {
        userId: "123",
        recordsList: [{ recordId: 1 }],
      };

      findRecordStub.resolves(fakeDocument);
      const result = await recordsController.removeRecordAndAdjustTotals(
        "123",
        1
      );

      expect(result).to.be.undefined;
    });

    it("should throw an error if the user is not found", async () => {
      findRecordStub.resolves(null);

      try {
        await recordsController.removeRecordAndAdjustTotals("999", 1);
      } catch (error) {
        expect(error.message).to.equal(
          "Transactions not found for the given user id"
        );
      }
    });

    it("should throw an error if the record is not found", async () => {
      const fakeDocument = {
        userId: "123",
        recordsList: [],
      };

      findRecordStub.resolves(fakeDocument);

      try {
        await recordsController.removeRecordAndAdjustTotals("123", 999);
      } catch (error) {
        expect(error.message).to.equal("Record not found");
      }
    });
  });
});
