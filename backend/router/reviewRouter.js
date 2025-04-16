const express = require('express');

const router = express.Router();

// Controller functions (import your actual controller functions here)
const {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
} = require('../controllers/reviewController');

// Routes
// Get all reviews
router.get('/', getAllReviews);

// Get a single review by ID
router.get('/:id', getReviewById);

// Create a new review
router.post('/', createReview);

// Update a review by ID
router.put('/:id', updateReview);

// Delete a review by ID
router.delete('/:id', deleteReview);

module.exports = router;