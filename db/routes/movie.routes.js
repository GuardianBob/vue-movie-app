const controller = require("../controllers/movie.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // app.post(
  //   "/db/movie/test_add",
  //   // [authJwt.verifyToken],
  //   // console.log("made it to the routes file..."),
  //   controller.test_add
  // );
  app.post(
    "/db/movie/add_movie",
    // [authJwt.verifyToken],
    // console.log("made it to the routes file..."),
    controller.add_movie
  );
};