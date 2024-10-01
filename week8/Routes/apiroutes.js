// routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../Controllers/bookingcontroller');
const searchController = require('../Controllers/searchcontroller');
const asyncHandler = require('../Utils/asyncHandler');


// API routes for bookings
router.post('/bookings', asyncHandler(bookingController.createBooking));
router.get('/bookings', bookingController.getBookings);
router.get('/bookings/:name', bookingController.getBookingByName);
router.put('/bookings/:name', bookingController.updateBooking);
router.delete('/bookings/:name', bookingController.deleteBooking);
router.get('/bookings', bookingController.getSortedBookings);

//search route
router.get('/search', searchController.searchdogsitter); 


module.exports = router;