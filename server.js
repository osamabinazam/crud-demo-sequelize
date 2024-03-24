import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

var corOptions = {
    origin: "http://localhost:8081",

};



// common middlewares
app.use(cors(corOptions));  // cors is a middleware

app.use(express.json()); // parse requests of content-type - application/json

app.use(express.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded

// routes 

// PRODUCT ROUTES
import productRoutes from './routes/productRoutes.js';
app.use('/api/products', productRoutes);

//REVIEW ROUTES
import reviewRoutes from './routes/reviewRoutes.js';
app.use('/api/reviews', reviewRoutes);

// server Configuration
const PORT = process.env.PORT || 8082;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);

