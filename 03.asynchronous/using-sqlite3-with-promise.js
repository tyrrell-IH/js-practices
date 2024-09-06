import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory");

const runPromise = (db, sqlStatement) =>
  new Promise((resolve) =>
    db.run(sqlStatement, function () {
      resolve(this);
    }),
  );

const getPromise = (db, sqlStatement) =>
  new Promise((resolve) =>
    db.get(sqlStatement, (err, row) => {
      resolve(row);
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
