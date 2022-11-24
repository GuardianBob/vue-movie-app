require("dotenv").config();
// const { fromWeb } = require("form-data");
const { Sequelize, Op, DataTypes } = require("sequelize");
const sqlite3 = require('sqlite3');

const sequelize = new Sequelize(
  'MovieDB',
  null,
  null,
  {
    host: '0.0.0.0',
    dialect: 'sqlite',
    // port: process.env.DBPORT,
    // dialectOptions: {},
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    storage: "../MovieDB.sqlite3"
  }
);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Op = Op;

// db.isUnique = (key, value, table) => {
//   return db[table]
//     .findOne({ where: { [key]: value } })
//     .then((value) => (value ? true : false));
// };

db.movie = require("./movie.model.js")(sequelize, Sequelize);

module.exports = db;