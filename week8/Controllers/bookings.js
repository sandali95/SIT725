const booking = require("../Models/bookings");

const getBookingByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const bookings = await booking.findByUserId(userId);
    if (!bookings) {
      return res
        .status(404)
        .json({ error: "Failed to fetch specific booking" });
    }
    res.status(200).json(bookings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch specific booking" });
  }
};

const confirmBooking = async (req, res) => {
  const { filter, update } = req.body;

  try {
    const updatedBooking = await booking.findByIdAndUpdate(
      filter.bookingId,
      update.confirmation
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json(updatedBooking);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: "Validation failed" });
    }
    console.log(error);
    res.status(500).json({
      error: "Failed to update booking",
    });
  }
};

const deleteBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const result = await booking.findOneAndDelete(bookingId);

    if (!result) {
      console.log(result);
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete booking" });
  }
};

const createBooking = async (req, res) => {
  try {
    const newBooking = await booking.save(req.body);
    res.status(201).json(newBooking);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
module.exports = {
  getBookingByUserId,
  confirmBooking,
  createBooking,
  deleteBooking,
};
