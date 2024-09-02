const chai = require("chai");
const sinon = require("sinon");
const mongoose = require("mongoose");
const { expect } = chai;
const { getNextSequence } = require("../../models/counter.js");

describe("getNextSequence", () => {
  let findByIdAndUpdateStub;

  beforeEach(() => {
    const sandbox = sinon.createSandbox();
    findByIdAndUpdateStub = sandbox.stub(mongoose.Model, "findByIdAndUpdate");
  });

  afterEach(() => {
    findByIdAndUpdateStub.restore();
  });

  it("should return the incremented sequence value", async () => {
    const name = "test";
    const mockCount = { seq: 1 };

    findByIdAndUpdateStub.resolves(mockCount);

    const result = await getNextSequence(name);

    expect(result).to.equal(1);
    expect(findByIdAndUpdateStub.calledOnce).to.be.true;
    expect(
      findByIdAndUpdateStub.calledWith(
        { _id: name },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      )
    ).to.be.true;
  });

  it("should create a new counter if it doesn't exist", async () => {
    const name = "newCounter";
    const mockCount = { seq: 1 };

    findByIdAndUpdateStub.resolves(mockCount);

    const result = await getNextSequence(name);

    expect(result).to.equal(1);
    expect(findByIdAndUpdateStub.calledOnce).to.be.true;
    expect(
      findByIdAndUpdateStub.calledWith(
        { _id: name },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      )
    ).to.be.true;
  });

  it("should handle errors from the database", async () => {
    const name = "errorCounter";
    const errorMessage = "Database error";

    findByIdAndUpdateStub.rejects(new Error(errorMessage));

    try {
      await getNextSequence(name);
      expect.fail("Expected error was not thrown");
    } catch (error) {
      expect(error.message).to.equal(errorMessage);
    }
  });
});
