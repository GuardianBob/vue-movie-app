import sqlite3 from 'sqlite3'

console.log(sqlite3)

const db = new sqlite3.Database('../../db/MovieDB.sqlite3', (err) => {
  if (err) {
    console.log('Error: ', err)
  } else {
    console.log('db opened')
  }
})

db.on("error", function(error) {
  console.log(error);
}); 

db.close()

export default async (/* { app, router, Vue ... } */) => {
}