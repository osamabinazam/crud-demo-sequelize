import reviewController from '../controllers/reviewController.js';
import express from 'express';
const router = express.Router();

// Create a new review
router.post('/', reviewController.addReview);

// Retrieve all reviews
router.get('/', reviewController.getAllReviews);

export default router;