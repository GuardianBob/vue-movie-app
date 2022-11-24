var express = require("express");
var Sequelize = require("sequelize");
var app = express();
var bodyParser = require("body-parser");
const sqlite = require("sqlite3")

// Using `public` for static files: http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// Define the sequelize access info
var sequelize = new Sequelize(
  "MovieDB",
  root,
  root,
  {
    host: "localhost",
    dialect: "sqlite",
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    // Data is stored in the file `movieDB.sqlite` in the folder `db`.
    // Note that if you leave your app public, this database file will be copied if
    // someone forks your app. So don't use it to store sensitive information.
    storage: "./MovieDB.sqlite3"
  }
);

sequelize
  .authenticate()
  .then(function(err) {
    console.log("Connection established.");
    // define new table: 'users'
    Movie = sequelize.define("movies", {
      title: {
        type: Sequelize.STRING
      }
    })
  })
  .catch(function(err) {
    console.log("Unable to connect to database: ", err);
  });

// Send user data - used by client.js
app.post("/db/test_add", function (request, response) {
  console.log("Made it to the backend!")

  // Movie.create({ title: request.body.title });
  // response.redirect("/");
});

var test_db = {
  test_add() {
    console.log("made it to the db file!")
  }
}

export default test_db