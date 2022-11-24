var Datastore = require('nedb');
// require('nedb');
var movies = new Datastore({ filename: '../movies.db', autoload: true });

exports.add_movie = async (movie) => {
  // async addMovie(movie) {
    console.log
    try {
      
      let new_movie = {
        title: movie.title,
        genre: movie.genre,
        rating: movie.rating,
      }
      movies.insert(new_movie, function (err, doc) {
        console.log('Inserted', doc.name, 'with ID', doc._id);
      });
      
      // res.send("Backend connection success!");
    } catch (error) {
      console.log(`Error: ${error}`)
    }
  }
// }

