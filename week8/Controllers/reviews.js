const Review = require('../Models/review');

// Get all reviews
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error); 
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

// Post a new review
const createReview = async (req, res) => {
    const { sitterName, rating, comment } = req.body;
  
    console.log('Received review data:', req.body); // Log received data
  
    const review = new Review({
      sitterName,
      rating,
      comment
    });
  
    try {
      const savedReview = await review.save();
      res.status(201).json(savedReview);
    } catch (error) {
      console.error('Failed to create review:', error); // Log error
      res.status(500).json({ error: 'Failed to create review' });
    }
  };
  

module.exports = { getReviews, createReview };
