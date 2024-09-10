import sqlite3 from "sqlite3";
import timers from "timers/promises";
import { runWithPromise, getWithPromise } from "./promise-based-function.js";

const db = new sqlite3.Database(":memory");

const runWithoutError = (db) => {
  runWithPromise(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE )",
  )
    .then(() =>
      runWithPromise(db, "INSERT INTO books(title) values ('蟹工船')"),
    )
    .then((insertResult) => {
      console.log(`id: ${insertResult.lastID}`);
      return getWithPromise(db, "SELECT * FROM books WHERE title = '蟹工船' ");
    })
    .then((row) => console.log(`id: ${row.id} title: ${row.title}`))
    .then(() => runWithPromise(db, "DROP TABLE books"));
};

const runWithError = (db) => {
  runWithPromise(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE )",
  )
    .then(() => runWithPromise(db, "INSERT INTO books(title) values (null)"))
    .catch((error) => console.log(error.message))
    .then(() => getWithPromise(db, "SELECT * FROM bookoff "))
    .catch((error) => console.log(error.message))
    .finally(() => runWithPromise(db, "DROP TABLE books"));
};

runWithoutError(db);
await timers.setTimeout(100);
runWithError(db);
