require('dotenv').config();

module.exports = {
    development: {
        "username": "postgres",
        "password": "zthmwz",
        "database": "sg_database",
        "host":     "127.0.0.1",
        "dialect":  "postgres",
        "seederStorage": "sequelize",
        "seederStorageTableName": "sequelize_data"
    },
    test: {
        "username": process.env.DB_TEST_USERNAME,
        "password": process.env.DB_TEST_PASSWORD,
        "database": process.env.DB_TEST_DATABASE,
        "host":     process.env.DB_TEST_HOST,
        "url":      process.env.DB_TEST_URL,
        "dialect":  "postgres",
        "seederStorage": "sequelize",
        "seederStorageTableName": "sequelize_data",
        "dialectOptions": {
            ssl: {
                require: true,
                rejectUnauthorized: false, 
            }
        },
    },
    production: {
        "username": process.env.DB_PROD_USERNAME,
        "password": process.env.DB_PROD_PASSWORD,
        "database": process.env.DB_PROD_DATABASE,
        "host":     process.env.DB_PROD_HOST,
        "url":      process.env.DB_PROD_URL,
        "dialect":  "postgres",
        "seederStorage": "sequelize",
        "seederStorageTableName": "sequelize_data",
        "dialectOptions": {
            ssl: {
                require: true,
                rejectUnauthorized: false, 
            }
        },
    }
};