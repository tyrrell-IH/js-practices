import sqlite3 from "sqlite3";
import timers from "timers/promises";
import {
  runWithPromise,
  getWithPromise,
  closeWithPromise,
} from "./promise-based-function.js";

const db = new sqlite3.Database(":memory:");

const executeWithoutError = (db) => {
  runWithPromise(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  )
    .then(() =>
      runWithPromise(db, "INSERT INTO books(title) VALUES ('蟹工船')"),
    )
    .then((insertResult) => {
      console.log(`id: ${insertResult.lastID}`);
      return getWithPromise(db, "SELECT * FROM books WHERE title = '蟹工船'");
    })
    .then((row) => {
      console.log(`id: ${row.id} title: ${row.title}`);
      runWithPromise(db, "DROP TABLE books");
    });
};

const executeWithError = (db) => {
  runWithPromise(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  )
    .then(() => runWithPromise(db, "INSERT INTO books(title) VALUES (NULL)"))
    .catch((error) => {
      console.error(error.message);
    })
    .then(() => getWithPromise(db, "SELECT * FROM bookoff"))
    .catch((error) => {
      console.error(error.message);
    })
    .then(() => runWithPromise(db, "DROP TABLE books"))
    .finally(() => closeWithPromise(db));
};

executeWithoutError(db);
await timers.setTimeout(100);
executeWithError(db);
