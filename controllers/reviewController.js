import db from "../models/index.js";

// 
const Review = db.reviews;

// Create and Save a new Review
const addReview = async (req, res) => {
    // Validate request
    if (!req.body.description) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Review
    const info = {
        description: req.body.description,
        rating: req.body.rating,
    };

    // Save Review in the database
    Review.create(info)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while creating the Review."
            });
        });
}

// Get all reviews
const getAllReviews = async (req, res) => {
    Review.findAll()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while retrieving reviews."
            });
        }
    );
}

// get a single review
const getReview = async (req, res) => {
    const id = req.params.id;

    Review.findByPk(id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while retrieving the review."
            });
        }
    );
}

// update a review
const updateReview = async (req, res) => {
    const id = req.params.id;

    Review.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Review was updated successfully."
                });
            } else {
                res.status(400).send({
                    message: `Cannot update Review with id=${id}. Maybe Review was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error updating Review with id=" + id
            });
        }
    );
}

// delete a review
const deleteReview = async (req, res) => {
    const id = req.params.id;

    Review.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Review was deleted successfully!"
                });
            } else {
                res.status(400).send({
                    message: `Cannot delete Review with id=${id}. Maybe Review was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Could not delete Review with id=" + id
            });
        }
    );
}


export default {
    addReview,
    getAllReviews,
    getReview,
    updateReview,
    deleteReview
};