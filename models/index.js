import dbConfig from "../config/dbConfig.js";
import productModel from "./productModel.js";
// import userModel from "./userModel";
import reviewModel from "./reviewModel.js";

import { Sequelize, DataTypes } from 'sequelize';


// Creeate a connection to the database using the configuration from config/dbConfig.js)
const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    // operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

// Authenticate the connection to the database
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});


// Create a database model for the user table
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = productModel(sequelize, DataTypes);
// db.users = userModel(sequelize, DataTypes);
db.reviews= reviewModel(sequelize, DataTypes);

db.sequelize.sync({ force: true })
.then(() => { console.log("Drop and re-sync db."); }
);

// export the database model
export default db;



