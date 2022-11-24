'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { LIMIT_COMPOUND_SELECT } = require('sqlite3');
// const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};
const SQLite = require("sqlite3");



// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, null, null, config);
// }


const sequelize = new Sequelize('MovieDB', null, null, {
  dialect: 'sqlite',
  storage: '../MovieDB.sqlite3', // or ':memory:'
  dialectOptions: {
    // Your sqlite3 options here
    // for instance, this is how you can configure the database opening mode:
    // mode: SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE | SQLite.OPEN_FULLMUTEX,
    mode: SQLite.OPEN_READWRITE
  },
});

// console.log('sequelize: ', sequelize)
// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.movie = require("./movie.model.js")(sequelize, Sequelize.DataTypes);

module.exports = db;
