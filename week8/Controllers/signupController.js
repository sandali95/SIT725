const { Registration } = require("../Models/signupModel");

const createRegistration = async (req, res) => {
  const {
    firstName,
    lastName,
    phone,
    email,
    address,
    suburb,
    postalCode,
    password,
    type,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !phone ||
    !email ||
    !address ||
    !suburb ||
    !postalCode ||
    !password
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newRegistration = new Registration({
    firstName,
    lastName,
    phone,
    email,
    address,
    suburb,
    postalCode,
    password,
    type,
  });

  try {
    const user = await newRegistration.save();
    res.status(201).json(user);
  } catch (error) {
    console.error("Error saving registration:", error);
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ error: "Validation failed", details: error.errors });
    }
    res.status(500).json({ error: "Failed to save registration" });
  }
};

const getProfile = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await Registration.find({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: "Failed to fetch specific user" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch specific booking2" });
  }
};

module.exports = {
  createRegistration,
  getProfile,
};
