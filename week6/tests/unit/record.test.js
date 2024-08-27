const chai = require("chai");
const sinon = require("sinon");
const mongoose = require("mongoose");
const expect = chai.expect;

const recordModel = require("../../models/record.js");

describe("Record Model", () => {
  before(async () => {
    mongoose.connect(process.env.DATABASE_URL);
  });

  after(async () => {
    await mongoose.disconnect();
  });

  describe("findRecordByUserId", () => {
    it("should return a record by userId", async () => {
      const fakeRecord = {
        userId: 123,
        incomeTotal: 1000,
        expenseTotal: 500,
        balanceTotal: 500,
        recordsList: [],
      };
      const findOneStub = sinon
        .stub(mongoose.Model, "findOne")
        .resolves(fakeRecord);

      const result = await recordModel.findRecordByUserId(123);
      expect(result).to.deep.equal(fakeRecord);

      findOneStub.restore();
    });

    it("should return null if no record is found", async () => {
      const findOneStub = sinon.stub(mongoose.Model, "findOne").resolves(null);

      const result = await recordModel.findRecordByUserId(999);
      expect(result).to.be.null;

      findOneStub.restore();
    });
  });

  describe("addRecordAndAdjustValues", () => {
    it("should add a record and update the totals", async () => {
      const updateOneStub = sinon
        .stub(mongoose.Model, "updateOne")
        .resolves({ nModified: 1 });

      const recordToAdd = { type: "income", value: 1000 };
      const result = await recordModel.addRecordAndAdjustValues(
        123,
        recordToAdd
      );

      expect(result.nModified).to.equal(1);

      updateOneStub.restore();
    });

    it("should handle errors during record addition", async () => {
      const updateOneStub = sinon
        .stub(mongoose.Model, "updateOne")
        .rejects(new Error("Update failed"));

      const recordToAdd = { type: "income", value: 1000 };

      try {
        await recordModel.addRecordAndAdjustValues(123, recordToAdd);
      } catch (error) {
        expect(error.message).to.equal("Update failed");
      }

      updateOneStub.restore();
    });
  });

  describe("removeRecordAndAdjustTotals", () => {
    it("should remove a record and update the totals", async () => {
      const updateOneStub = sinon
        .stub(mongoose.Model, "updateOne")
        .resolves({ nModified: 1 });

      const recordToRemove = { type: "income", value: 1000 };
      const result = await recordModel.removeRecordAndAdjustTotals(
        123,
        recordToRemove
      );

      expect(result.nModified).to.equal(1);

      updateOneStub.restore();
    });

    it("should handle errors during record removal", async () => {
      const updateOneStub = sinon
        .stub(mongoose.Model, "updateOne")
        .rejects(new Error("Update failed"));

      const recordToRemove = { type: "income", value: 1000 };

      try {
        await recordModel.removeRecordAndAdjustTotals(123, recordToRemove);
      } catch (error) {
        expect(error.message).to.equal("Update failed");
      }

      updateOneStub.restore();
    });
  });
});
