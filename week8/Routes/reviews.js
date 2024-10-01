const express = require('express');
const router = express.Router();
const { getReviews, createReview } = require('../Controllers/reviews');

// GET all reviews
router.get('/', getReviews); 
 
// POST a new review
router.post('/', createReview);  
 
module.exports = router;
  