var express = require("express");
var bodyParser = require("body-parser");
const db = require('./models');
const movie = require("./controllers/movie.controller");
const cors = require('cors');


const api = express();
console.log('reached server.js')

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
  ],
  crossdomain: true,
  // methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  // credentials: true
};
api.use(cors(corsOptions));
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));
// require('./routes/movie.routes')(api);

api.get('/', (req, res) => {
  // res.send('Working');
  console.log('hit the server')
});

api.post(
    "/db/movie/test_add",
    // [authJwt.verifyToken],
    // console.log("made it to the routes file..."),
    movie.test_add
  );

let server = api.listen(3000, () => console.log(`Express server listening on port 3000`));