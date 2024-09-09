import sqlite3 from "sqlite3";

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

const noeErrorAsyncAwait = async (db) => {
  await runPromise(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE )",
  );
  const insertResult = await runPromise(
    db,
    "INSERT INTO books(title) values ('蟹工船')",
  );
  console.log(`id: ${insertResult.lastID}`);
  const selectedRow = await getPromise(
    db,
    "SELECT * FROM books WHERE title = '蟹工船' ",
  );
  console.log(`id: ${selectedRow.id} title: ${selectedRow.title}`);
  await runPromise(db, "DROP TABLE books");
};

noeErrorAsyncAwait(db);
