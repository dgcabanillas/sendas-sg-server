'use strict';

const filesystem = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const config = require(path.resolve(__dirname, '..', '..', 'config', 'database.js'))[env];
const db = {};

let sequelize;
if( env == 'production' || env == "test" ) {
    sequelize = new Sequelize( process.env.DATABASE_URL || config.url , {
        ssl: true,
        underscored: true,
        freezeTableName: true,
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false, 
            }
        },
    });
} else {
    sequelize = new Sequelize( config.database, config.username, config.password, {
        dialect: config.dialect,
        define: {
            underscored: true,
            freezeTableName: true
        },
    });
}

filesystem
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const { default: Model } = require(path.join(__dirname, file));
        const model = Model(sequelize, Sequelize.DataTypes);
        const modelName = file.split('.')[0];
        db[modelName] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;