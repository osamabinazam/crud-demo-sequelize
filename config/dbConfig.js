

const dbConfig = {
    host: 'localhost',
    user: 'postgres',
    password: 'toor',
    database: 'sequelize_db',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};


// module export 
export default dbConfig;