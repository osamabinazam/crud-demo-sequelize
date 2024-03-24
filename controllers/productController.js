import db from "../models/index.js";

// Create main model object

const Product = db.products;
const review = db.reviews;


// Create and Save a new Product
const addProduct = async (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    

    // Create a Product
    const info = {
        title: req.body.title, 
        price: req.body.price,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    // Save Product in the database
    const product = Product.create(info)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while creating the Product."
            });
        });
}

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).send(products);
    } catch (err) {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving products."
        });
    }
}

// get a single product
const getProduct = async (req, res) => {
    const id = req.params.id;

    try {
        const product = await Product.findByPk(id);
        res.status(200).send(product);
    } catch (err) {
        res.status(500).send({
            message: err.message || `Error retrieving product with id=${id}`
        });
    }
}

// Update a product
const updateProduct = async (req, res) => {
    const id = req.params.id;

    const product =  Product.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Product was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error updating Product with id=${id}`
            });
        });
}

// Delete a product 
const deleteProduct = async (req, res) => {
    const id = req.params.id;

    Product.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Product was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Could not delete Product with id=${id}`
            });
        });
}

// Delete all products
const deleteAllProducts = async (req, res) => {
    Product.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.status(200).send({ message: `${nums} Products were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while removing all products."
            });
        });
}

// Find all published products
const findAllPublished = async (req, res) => {
    console.log("Finiding Published Products")
    const product = await Product.findAll({ where: { published: true } })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while retrieving products."
            });
        });
}



export default {
    addProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    deleteAllProducts,
    findAllPublished
};

