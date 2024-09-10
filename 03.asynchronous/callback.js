import sqlite3 from "sqlite3";
import timers from "timers/promises";

const db = new sqlite3.Database(":memory");

const executeWithoutError = () =>
  db.run(
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE )",
    () =>
      db.run("INSERT INTO books(title) values ('蟹工船')", function () {
        console.log(`id: ${this.lastID}`);
        db.get("SELECT * FROM books WHERE title = '蟹工船' ", (error, row) => {
          console.log(`id: ${row.id} title: ${row.title}`);
          db.run("DROP TABLE books");
        });
      }),
  );

const executeWithError = () =>
  db.run(
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE )",
    () =>
      db.run("INSERT INTO books(title) values (null)", (error) => {
        console.log(error.message);
        db.get("SELECT * FROM bookoff ", (error) => {
          console.log(error.message);
          db.run("DROP TABLE books");
        });
      }),
  );

executeWithoutError();
await timers.setTimeout(100);
executeWithError();
