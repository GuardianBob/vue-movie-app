var express = require("express");
// var Sequelize = require("sequelize");
var bodyParser = require("body-parser");
var path = require('path');
var index = require('./routes/index');
const cors = require('cors');
// var index = require('./routes/index');
// import sqlite3 from 'sqlite3';
// import express from 'express';
// import Sequelize from 'sequelize';
// import bodyParser from 'body-parser'

const api = express();

// Using `public` for static files: http://expressjs.com/en/starter/static-files.html
var corsOptions = {
  exposedHeaders: ['refresh-token'],
  origin: '*',
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Access-Control',
    'Authorization',
    'Cache-Control',
    'Content-Language',
    'Expires',
    'Last-Modified',
    'Pragma',
    'x-Access-Token',
    'Access-Control-Allow-Origin',
    req.headers.origin
  ],
  crossdomain: true,
  // methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  // credentials: true
};
api.use(cors(corsOptions));
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));
// api.use(express.static(path.join(__dirname, 'public')));
// api.use(express.static("public"));
// api.use('/', index);
require('./routes/movie.routes')(api);
const db = require('./models');
api.get('/', (req, res) => {
  // res.send('Working');
  console.log('hit the server')
});

let server = api.listen(3000, () => console.log(`Express server listening on port 3000`));
// let server = http.createServer(credentials, app);


// Define the sequelize access info
// var sequelize = new Sequelize(
//   "MovieDB",
//   {
//     host: "localhost",
//     dialect: "sqlite",
//     pool: {
//       max: 5,
//       min: 0,
//       idle: 10000
//     },
//     // Data is stored in the file `movieDB.sqlite` in the folder `db`.
//     // Note that if you leave your app public, this database file will be copied if
//     // someone forks your api. So don't use it to store sensitive information.
//     storage: "./MovieDB.sqlite3"
//   }
// );

// sequelize
//   // .authenticate()
//   .then(function(err) {
//     console.log("Connection established.");
//     // define new table: 'users'
//     Movie = sequelize.define("movies", {
//       title: {
//         type: Sequelize.STRING
//       }
//     })
//   })
//   .catch(function(err) {
//     console.log("Unable to connect to database: ", err);
//   });

// Send user data - used by client.js
// api.post("/db/test_add", function (request, response) {
//   console.log("Made it to the backend!")

//   // Movie.create({ title: request.body.title });
//   // response.redirect("/");
// });

// var test_db = {
//   test_add() {
//     console.log("made it to the db file!")
//   }
// }

// export default test_db
// module.exports = api;