// const Datastore = requirejs('nedb');
import Datastore from 'nedb-promises';
// const {app} = require('electron');

const movies = Datastore.create({ filename: '../movies.db', autoload: true });
// const db = (fileName) => Datastore.create({
//   filename: `${process.env.NODE_ENV === 'dev' ? '.' : app.getAppPath('userData')}/data/${fileName}`, 
//   timestampData: true,
//   autoload: true
// });

// const movies = {
//   movies: db('movies.db'),
// }

export default movies;
// module.exports = movies;
