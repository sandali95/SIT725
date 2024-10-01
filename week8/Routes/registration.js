const express = require("express");
const router = express.Router();
const {
  createRegistration,
  getProfile,
} = require("../Controllers/signupController");
const {
  createNewWalkerRegistration,
  getWalkerProfile,
} = require("../Controllers/signUpControllerWalker");

router.post("/registerOwner", createRegistration);
router.post("/registerWalker", createNewWalkerRegistration);
router.get("/owner/:userId", getProfile);
router.get("/walker/:userId", getWalkerProfile);

module.exports = router;
