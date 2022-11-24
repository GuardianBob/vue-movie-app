const db = require("../models");
const Op = db.Sequelize.Op;
const { Sequelize } = require("sequelize");
const { QueryTypes } = require("sequelize");
const { movie } = require("../models");
const SQLite = require("sqlite3");

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

exports.test_add = async (req, res) => {
  try {
    console.log(req.params, req.query, req.body);
    console.log("hit the new controller!");
    // console.log('trying to connect db: ', db);
    // const new_movie = await movie.create({ title: req.body.title }); 

    
    res.send("Backend connection success!");
  } catch (error) {
    console.log(`Error: ${error}`)
  }
};
