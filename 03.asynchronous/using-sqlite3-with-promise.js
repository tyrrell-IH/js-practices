import sqlite3 from "sqlite3";
import timers from "timers/promises";

const db = new sqlite3.Database(":memory");

const runPromise = (db, sqlStatement) =>
  new Promise((resolve, reject) => {
    db.run(sqlStatement, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });

const getPromise = (db, sqlStatement) =>
  new Promise((resolve, reject) =>
    db.get(sqlStatement, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    }),
  );

runPromise(
  db,
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE )",
)
  .then(() => runPromise(db, "INSERT INTO books(title) values ('蟹工船')"))
  .then((value) => {
    console.log(`id: ${value.lastID}`);
    return getPromise(db, "SELECT * FROM books WHERE title = '蟹工船' ");
  })
  .then((row) => console.log(`id: ${row.id} title: ${row.title}`))
  .then(() => runPromise(db, "DROP TABLE books"));

await timers.setTimeout(100);

runPromise(
  db,
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE )",
)
  .then(() => runPromise(db, "INSERT INTO books(title) values (null)"))
  .catch((err) => console.log(err.message))
  .then(() => getPromise(db, "SELECT * FROM bookoff "))
  .catch((err) => console.log(err.message))
  .finally(() => runPromise(db, "DROP TABLE books"));
