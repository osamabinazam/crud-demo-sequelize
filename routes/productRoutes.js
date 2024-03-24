
import productController from '../controllers/productController.js';
import express from 'express';
const router = express.Router();

// Create a new product
router.post('/', productController.addProduct);

// Retrieve all published products
router.get('/published', productController.findAllPublished); 

// Retrieve all products
router.get('/', productController.getAllProducts);

// Retrieve a single product with id
router.get('/:id', productController.getProduct);

// Update a product with id
router.put('/:id', productController.updateProduct);

// Delete a product with id
router.delete('/:id', productController.deleteProduct);

// Delete all products
router.delete('/', productController.deleteAllProducts);

// Retrieve all reviews for a product
router.get('/:id/reviews', productController.getProductReviews);


export default router;



