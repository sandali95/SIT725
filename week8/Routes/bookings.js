const express = require("express");
const router = express.Router();
const bookingController = require("../Controllers/bookings");
const path = require("path");

// API routes for bookings

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "Views", "bookingConfirmation.html"));
});
router.get("/bookings/:userId", bookingController.getBookingByUserId);
router.patch("/bookings/:userId", bookingController.confirmBooking);
router.post("/bookings/save", bookingController.createBooking);
router.delete("/bookings/:bookingId", bookingController.deleteBooking);

module.exports = router;
