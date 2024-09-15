import sqlite3 from "sqlite3";
import timers from "timers/promises";

const db = new sqlite3.Database(":memory:");

const executeWithoutError = (db) =>
  db.run(
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    () =>
      db.run("INSERT INTO books(title) VALUES ('蟹工船')", function () {
        console.log(`id: ${this.lastID}`);
        db.get("SELECT * FROM books WHERE title = '蟹工船'", (_error, row) => {
          console.log(`id: ${row.id} title: ${row.title}`);
          db.run("DROP TABLE books");
        });
      }),
  );

const executeWithError = (db) =>
  db.run(
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    () =>
      db.run("INSERT INTO books(title) VALUES (NULL)", (error) => {
        console.error(error.message);
        db.get("SELECT * FROM bookoff", (error) => {
          console.error(error.message);
          db.run("DROP TABLE books", () => {
            db.close();
          });
        });
      }),
  );

executeWithoutError(db);
await timers.setTimeout(100);
executeWithError(db);
